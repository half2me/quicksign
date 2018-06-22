import base64

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.hashes import SHA256
from cryptography.hazmat.primitives.serialization import load_pem_private_key


class Crypto:
    def __init__(self, key, password=None):
        p = bytes(password, 'utf-8') if password is not None else None
        with open('private/' + key, 'rb') as f:
            self.key = load_pem_private_key(f.read(), password=p, backend=default_backend())

    """ Returns signature in base64 encoded DER format"""
    def sign(self, data):
        return base64.b64encode(self.key.sign(data=bytes(data, 'utf-8'), signature_algorithm=ec.ECDSA(SHA256()))).decode("utf-8")
