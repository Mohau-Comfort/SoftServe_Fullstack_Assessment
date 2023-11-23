using Fullstack_Web_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_Web_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : ControllerBase
    {
        private static List<Customer> _customers = new List<Customer>();

        [HttpPost]
        public IActionResult CreateCustomer([FromBody] Customer customer)
        {
            // Validate email address
            if (!IsValidEmail(customer.EmailAddress))
            {
                return BadRequest("Invalid email address");
            }

            // Set DateCreated
            customer.DateCreated = DateTime.Now;

            // Set initial DateEdited
            customer.DateEdited = null;

            // Set CustomerId
            customer.CustomerId = Guid.NewGuid();

            _customers.Add(customer);

            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.CustomerId }, customer);
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(_customers);
        }

        [HttpGet("{id}")]
        public IActionResult GetCustomerById(Guid id)
        {
            var customer = _customers.FirstOrDefault(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(Guid id, [FromBody] Customer updatedCustomer)
        {
            var existingCustomer = _customers.FirstOrDefault(c => c.CustomerId == id);

            if (existingCustomer == null)
            {
                return NotFound();
            }

            // Validate email address
            if (!IsValidEmail(updatedCustomer.EmailAddress))
            {
                return BadRequest("Invalid email address");
            }

            // Update properties
            existingCustomer.FirstName = updatedCustomer.FirstName;
            existingCustomer.LastName = updatedCustomer.LastName;
            existingCustomer.EmailAddress = updatedCustomer.EmailAddress;
            existingCustomer.DateOfBirth = updatedCustomer.DateOfBirth;
            existingCustomer.DateEdited = DateTime.Now;

            return Ok(existingCustomer);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(Guid id)
        {
            var customer = _customers.FirstOrDefault(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            _customers.Remove(customer);

            return NoContent();
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
