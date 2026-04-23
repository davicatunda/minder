# Minder

A safe place to organize all the things one person must know about themselves.

## What is

Imagine that you lost your memory due to an acident or disease, or maybe ~most
likely~ you simple are not that great in remembering things. Here you would store
anything you might want to remember on a simple Client to Client encryption platform.

Think about long term knowledge. Think about any form you ever had to fill, but had to
stop and look for some info.

## Usage

Currently I'm the only user with preferences for offline consumption. So there is
only one way.

1. Create a key
2. Store the key on your computer/dropbox/usb driver (don't lose it, it's the only way to decrypt your data)
3. Create some test data
4. Add new fields, remove old fields, change some fields
5. Store your data on someplace (preferably not together with your key, but do as you please)
6. Live your life
7. Come back and upload your key and data to the browser, and repeat steps 4, 5 and 6.

## Goals

- [x] encryption client to client layer
- [x] initial CRUD operations
- [ ] build User Voted Standard for the recommend fields everyone should have
- [ ] create partial copies of your data into shareable units for 3rd parties to consume
- [ ] Based on standard create a backend backed by graphql for automatization
