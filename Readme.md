# PayPal over Braintree #

The project utilizes the Braintree Node SDK and essentially provides a passthrough/proxy setup in order to operate Braintree server side scalls via Postman.  It contains implementations of major Braintree API operations including:

* Customer
* Transaction
* ClientToken
* some others

## Requirements ##
* **Node.js** - Download and install node.js for your particular platform [here](https://nodejs.org/en/).  *This application currently runs on v8.16.2 which works best with PayPal proxy and network security policies.*
* **Postman** A relatively complete Postman collection can be found in the PayPal Postman Enterprise space [here](https://paypal.postman.co/collections/9281899-992e5bf9-d7f8-4e74-9765-1ff4ff206a38?version=latest&workspace=73471cdb-d901-4e96-85b8-0a072dec19f5).  For a quick import of the collection, the following is a [direct shared Postman collection](https://www.getpostman.com/collections/dd7ef986309c94e3b698).

### Install Local ###
* Clone or download this repository to your local machine.  
You can either download a .zip and uncompress the files locally, or clone the repository using Git.  More detailed instructions can be found [here](https://github.paypal.com/NA-LE/paypal-jsv4-postman/blob/master/GitSetup.md).
* Perform ```npm install``` within the project directory.

### Run on Heroku
See the documents at the following location for a quick Heroku setup guide:  https://github.paypal.com/NA-LE/paypal-jsv4-venmo#heroku-preparation

### Configure ###
* Create a Braintree Sandbox developer account and PayPal sandbox REST application per your particular requirements.
* Customize your credentials:
    * Local deployment:  See [./config/local_example.js](./config/local_example.js)
    * Remote deployment:  Review the [config documentation](./config/Readme.md) for your particular needs.

### Run ###
```npm start``` and then navigate your browser to http://localhost:3000/ (local deloyment only)


