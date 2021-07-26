BT 'MULTIPLE API KEY TEST'

Overview:

Testing transaction scenarios using 2 different Braintree Gateway "API Key" sets.  Both API Keys used the same BT sandbox gateway account (i.e same merchant id).  The PayPal account linked was also the same across both API Keys.

Public Key 1 (key 1): jvkw2g3tvfjqcfnm
Public Key 2 (key 2): z492zj2ff67pvmp5

Scenario 1 (Authorization): Nonce using key 1; Auth/Capture using key 2

- Nonce created w/key 1 - OK
- Auth w/key 2 - OK
- Capture W/key 2 - OK

Scenario 2 (Authorization): Nonce/Auth using key 1;  Capture using key 2

- Nonce created w/key 1 - OK
- Auth w/key 1 - OK
- Capture w/key 2 - OK

Scenario 3 (Order): Nonce using key 1;  Customer, Auth, Capture, Refund using key 2.

- Nonce created w/key 1 - OK
- Customer created w/key 1 - OK
- Auth w/Key 2 - OK
- Capture w/key 2 - OK
- Refund w/key 2 - OK

Scenario 4 (Order): Nonce using key 2; Customer, Auth, Capture, Refund using keys 1/2

- Nonce created w/key 2 - OK
- Customer created w/key 2 - OK

- Auth w/key 2 - OK (Tx 1: 4jrbbhfb, 6.00)
- Auth w/key 1 - OK (Tx 2: 0qc6mqkp, 6.20)

- Capture Tx 1 w/key 1 - OK
- Capture Tx 2 w/key 1 - OK

- Refund both w/key 2 - OK