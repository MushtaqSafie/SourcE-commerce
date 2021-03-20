module.exports = {
  isCustomerType: function(type) {
    if (type === "customer") {
      return true;
    }
    return false;
  }
};

// Here we are saying if the type passed in is a customer,
// we will return true, which will then show whatever you want to show for
// customers in your handlebar files.
// If it is not a customer, it will return false and show the else condition in your hbs
