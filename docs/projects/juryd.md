# Juryd
* [https://juryd.com](https://juryd.com)
* [https://beta.juryd.com](https://beta.juryd.com)


#### Build Structure

* [Babel](https://babeljs.io/)
* [webpack](https://webpack.js.org/)

##### Testing


#### Front End

* [React](https://facebook.github.io/react/)
	* [React Storybooks](https://storybooks.js.org/)
* [Redux](http://redux.js.org/)
* [socket.io](https://github.com/socketio/socket.io/)
* [next.js](https://github.com/zeit/next.js)

#### API

* [Feathers.js](https://docs.feathersjs.com)

#### Mobile/Desktop


* [React Native](https://facebook.github.io/react-native/)
	* [Expo](https://expo.io/)
	* [Expo Docs](https://docs.expo.io/)
* [photon](https://github.com/connors/photon)
* [electron](https://github.com/electron/electron)
	* [react native desktop](https://github.com/ptmt/react-native-macos)


#### Database

* MongoDB
	* [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)



#### Payment Processing

* [Node.js library for the Stripe API](https://github.com/stripe/stripe-node)
* [Stripe - Docs](https://stripe.com/docs)
	* [Stripe - Saving credit card details for later](https://stripe.com/docs/charges#saving-credit-card-details-for-later)
	```
	# get the credit card details submitted by the form or app
	token = params[:stripeToken]

	# create a Customer
	customer = Stripe::Customer.create(
	  card: token,
	  description: 'description for payinguser@example.com',
	  email: 'payinguser@example.com'
	)

	# charge the Customer instead of the card
	Stripe::Charge.create(
	    amount: 1000, # in cents
	    currency: 'usd',
	    customer: customer.id
	)

	# save the customer ID in your database so you can use it later
	save_stripe_customer_id(user, customer.id)

	# later
	customer_id = get_stripe_customer_id(user)

	Stripe::Charge.create(
	    amount: 1500, # $15.00 this time
	    currency: 'usd',
	    customer: customer_id
	)
	```

#### Legal

- [https://stripe.com/atlas](https://stripe.com/atlas)

#### Conceptual

#### Other

[https://en.wikipedia.org/wiki/Pay_to_play](https://en.wikipedia.org/wiki/Pay_to_play)

##### Related Articles
[Celery Joins Forces With Indiegogo](https://blog.trycelery.com/celery-joins-forces-with-indiegogo/)  
[Can the web save the press from oblivion?](https://www.theguardian.com/media/2016/apr/17/can-internet-save-printed-press-blendle-lumi)
