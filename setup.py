#!/usr/bin/env python3
from setuptools import setup, find_packages

setup(name='quicksign',
      version='1.0',
      description='Quicly Sign Data',
      url='https://github.com/half2me/quicksign',
      author='Benjamin Tamási',
      author_email='h@lfto.me',
      license='MIT',
      packages=find_packages(),
      python_requires='>=3.6',
      install_requires=[
          'aiohttp',
      ],
      zip_safe=False)
