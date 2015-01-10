# Profile Helper
This helper is ment to assist you with read/write operations to the users profile.
It is only working with the the Meteor.user().profile namespace.

## Get Started

Create a Profile helper in your Namespace

	MyApp.profile = new ProfileHelper();

## Write to Profile

	MyApp.profile.set("onboarding.messages.search", true);

## Read from Profile
	
	MyApp.profile.get("onboarding.messages.search");
	-> true


## Advanced Write Operations
If you want to change the Operator to use for your profile field, you can just pass it as a third parameter.
You can use all working Mongo Operators: $push, $addToSet, $pull etc..

	MyApp.profile.set("myNumbers", [1,2,3]);
	MyApp.profile.get("myNumbers");
	-> [1,2,3]

	// Add a number to the Array 
	MyApp.profile.set("myNumbers", 21, "$addToSet");
	MyApp.profile.get("myNumbers");
	-> [1,2,3,21]


## No User Account - Experimental
If your visitor has no user account the package will fallback using the Session.
This will be improved and is still experimental


##Contribution
Feature requests and Bug Reports are very welcome :)