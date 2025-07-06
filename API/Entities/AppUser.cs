namespace API.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        //OLD para EF debe ser siempre ID, igual creeria que agregarse un decorador posible ser puede

        public required string DisplayName { get; set; }
        public required string Email { get; set; }
    }
}
