Fluent Validation
==================
- Collection of notes on Fluent Validation
- Primary source is [here](https://github.com/JeremySkinner/FluentValidation/wiki)

## Example

```(csharp)
using FluentValidation;

public class CustomerValidator: AbstractValidator<Customer> {
  public CustomerValidator() {
    RuleFor(customer => customer.Surname).NotEmpty();
    RuleFor(customer => customer.Forename).NotEmpty().WithMessage("Please specify a first name");
    RuleFor(customer => customer.Discount).NotEqual(0).When(customer => customer.HasDiscount);
    RuleFor(customer => customer.Address).Length(20, 250);
    RuleFor(customer => customer.Postcode).Must(BeAValidPostcode).WithMessage("Please specify a valid postcode");
  }

  private bool BeAValidPostcode(string postcode) {
    // custom postcode validating logic goes here
  }
}

Customer customer = new Customer();
CustomerValidator validator = new CustomerValidator();
ValidationResult results = validator.Validate(customer);

bool validationSucceeded = results.IsValid;
IList<ValidationFailure> failures = results.Errors;
```

## Basics
- Add a reference to FluentValidation.dll
- Create a class that inherits from AbstractValidator<T>, where T is the class you want to validate.
- The validation rules will be defined in the validator class'es constructor, using the `RuleFor()` method, and using a lambda to identify the property you want to validate.
- You can chain validators for the same property too.

```(csharp)
public class CustomerValidator : AbstractValidator<Customer> {
  public CustomerValidator() {
    RuleFor(customer => customer.Surname).NotNull().NotEqual("foo");
  }
}
```

- Extension Method for ValidationResult which will 
Validate().Accumulate(ValidationResult[] curArray)

- `Validate()` method returns a ValidationResult object which has 2 properties:
  - IsValid (boolean)
  - Errors a collection of ValidationFailure objects:
    - Property
    - ErrorMessage

```(csharp)
Customer customer = new Customer();
CustomerValidator validator = new CustomerValidator();

ValidationResult results = validator.Validate(customer);

if(! results.IsValid) {
  foreach(var failure in results.Errors) {
    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
  }
}
```

- Use `RuleForEach()` instead of `RuleFor()` to apply the same rule to multiple items in a collection.
- You can compose validators for complex classes with `SetValidator()`:

```(csharp)
public class Customer {
  public string Name { get; set; }
  public Address Address { get; set; }
}

public class Address {
  public string Line1 { get; set; }
  public string Line2 { get; set; }
  public string Town { get; set; }
  public string County { get; set; }
  public string Postcode { get; set; }
}

public class AddressValidator : AbstractValidator<Address> {
  public AddressValidator() {
    RuleFor(address => address.Postcode).NotNull();
    //etc
  }
}

public class CustomerValidator : AbstractValidator<Customer> {
  public CustomerValidator() {
    RuleFor(customer => customer.Name).NotNull();
    RuleFor(customer => customer.Address).SetValidator(new AddressValidator());
  }
} 
```

- You can use a similar method, `SetCollectionValidator()`, to validate properties which are collections:

```(csharp)
public class Customer {
   public IList<Order> Orders { get; set; }
}

public class Order {
  public string ProductName { get; set; }
  public decimal? Cost { get; set; }
}

var customer = new Customer();
customer.Orders = new List<Order> {
  new Order { ProductName = "Foo" },
  new Order { Cost = 5 } 
};

public class OrderValidator : AbstractValidator<Order> {
    public OrderValidator() {
        RuleFor(x => x.ProductName).NotNull();
        RuleFor(x => x.Cost).GreaterThan(0);
    }
}

public class CustomerValidator : AbstractValidator<Customer> {
    public CustomerValidator() {
        RuleFor(x => x.Orders).SetCollectionValidator(new OrderValidator());
    }
}

var validator = new CustomerValidator();
var results = validator.Validate(customer);
```

- You can use RuleSets to group validation rules together and then validate based on those separately.
  - Good use case might be when you only want to execute the validation rules (on the server) that were NOT already performed in the client.

```(csharp)
 public class PersonValidator : AbstractValidator<Person> {
  public PersonValidator() {
     RuleSet("Names", () => {
        RuleFor(x => x.Surname).NotNull();
        RuleFor(x => x.Forename).NotNull();
     });
 
     RuleFor(x => x.Id).NotEqual(0);
  }
}

var validator = new PersonValidator();
var person = new Person();
var result = validator.Validate(person, ruleSet: "Names");
//you can validate multiple rulesets with syntax like the following:
//validator.Validate(person, ruleSet: "Names,MyRuleSet,SomeOtherRuleSet")
```

- **Performance Note**: Instantiation of validators is fairly expensive 
  - instantiate as singletons which can be cached and reused
  - the contain no state, so they are thread safe

## Built-In Validators
- `NotNull`
- `NotEmpty`
- `NotEqual(stringValue)` or `NotEqual(lambda)`
- `Equal(stringValue)` or `Equal(lambda)`
- `Length(min, max)`
- `LessThan(number)` or `LessThan(lambda)`
- `LessThanOrEqual(...)`
- `GreaterThan(...)`
- `GreaterThanOrEqual(...)`
- `Must(predicate)` (predicate = lambda which returns boolean)
- `Matches(Regex string)`
- `EmailAddress()`
- Conditions:
  - `When()`
  - `Unless()`
  - allows you to specify conditions that control when the rule is executed

  ```(csharp)
  RuleFor(customer => customer.CustomerDiscount).GreaterThan(0).When(customer => customer.IsPreferredCustomer);
  ```

## Configuration
- use `WithMessage` to override the default error message
  - You can use the following placeholders in the string arguments
  - PropertyName
  - PropertyValue
  - ComparisonValue (when using the comparison validators)
  - MinLength, MaxLength, TotalLength (when using Length validator)

```(csharp)
RuleFor(customer => customer.Surname).NotNull().WithMessage("Please ensure you have entered your {PropertyName}");
```
- If you just want to override the property name and not the whole message, use `WithName(string)`

```(csharp)
RuleFor(customer => customer.Surname).NotNull().WithName("Last name");
```

- You can use the cascade setting to control whether a Rule stops on first validation fail or continues.
  - Continue: run all
  - StopOnFirstFailure: short circuit

```(csharp)
RuleFor(x => x.Surname).Cascade(CascadeMode.StopOnFirstFailure).NotNull().NotEqual("foo");
```

You can also set the cascademode globally:

```(csharp)
ValidatorOptions.CascadeMode = CascadeMode.StopOnFirstFailure;
```

## Custom Validators
- Variety of ways to approach this, but easiest is just to use the `Must()`
  - For more options, see [this](https://github.com/JeremySkinner/FluentValidation/wiki/e.-Custom-Validators)

## Integration with AspNetCore
- You can configure Fluent Validation to be integrated inthe AspNet model binding infrastructure

## My Guidelines for Fluent Validation

- You should definitely have one validator class per model class.
  - Simple, testable
  - Any subclasses which need validation will be invoked by the client.  
    - **NOT THE PARENT VALIDATOR**
    - It's a good validation library, but it's combining validation functionality with Control flow, which should be controlled elsewhere
    - Control flow is an area where you want to have lots of flexibility too:
      - Control Flow Scenario A: Validate everything in a dedicated pass.
      - Control Flow Scenario B: Validate and do DB CRUD in a single pass.
    - So don't use `SetValidator()`                                              
- Each validator class will be instantiated by a service which is scoped as a singleton                            




