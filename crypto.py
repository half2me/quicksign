import base64
import hashlib

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, utils
from cryptography.hazmat.primitives.serialization import load_pem_private_key


class Crypto:
    def __init__(self, key, password=None):
        p = bytes(password, 'utf-8') if password is not None else None
        with open('private/' + key, 'rb') as f:
            self.key = load_pem_private_key(f.read(), password=p, backend=default_backend())

    """ Returns signature in base64 encoded DER format"""
    def sign(self, data):
        prehashed_msg = hashlib.sha256(bytes(data, 'utf-8')).digest()
        signature = self.key.sign(prehashed_msg, padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ), utils.Prehashed(hashes.SHA256()))

        return base64.b64encode(signature).decode("utf-8")
