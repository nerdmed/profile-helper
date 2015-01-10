# Profile Helper
This helper is ment to assist with read/write operations to the users profile.
It is only handling with the Meteor Accounts provided profile namespace.
If there is no user logged in it is using the Session to work properly.

## Get Started

Create a Profile helper in your Namespace

	MyApp.profile = new ProfileHelper();

## Write to Profile

	MyApp.profile.set("onboarding.messages.search", true);

## Read from Profile
	
	MyApp.profile.get("onboarding.messages.search");
	-> true


##Contribution
Feature requests and Bug Reports are very welcome :)