namespace Fullstack_Web_API.Models
{
    public class Customer
    {

        public Guid CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName => $"{FirstName} {LastName}";
        public string EmailAddress { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age => CalculateAge();
        public DateTime DateCreated { get; set; }
        public DateTime? DateEdited { get; set; }
        public bool IsDeleted { get; set; }

        //function to calculate age automatically based on date of birth
        private int CalculateAge()
        {
            DateTime currentDate = DateTime.Now;
            int age = currentDate.Year - DateOfBirth.Year;

            if (currentDate < DateOfBirth.AddYears(age))
            {
                age--;
            }

            return age;
        }

        // Additional property to get only the date part of DateOfBirth
        public DateTime DateOfBirthDateOnly => DateOfBirth.Date;

    }
}
