namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; } //para EF debe ser siempre ID, igual creeria que agregarse un decorador posible ser puede
        public required string UserName { get; set; }
    }
}
