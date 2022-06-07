using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Playground.Models;
using Microsoft.AspNetCore.Authorization;

namespace Playground.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public BookController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet] 
        [Authorize]
        public JsonResult Get()
        {
            string query = @"
            select BookID,BookName,Author,Price,PublishingDate from BookTable";
            DataTable table=new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BookAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                 using (SqlCommand myCommand=new SqlCommand(query,myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
                 return new JsonResult(table);
            }
        }

        [HttpPost]
        public JsonResult Post(Book book)
        {
            string query = @"
            insert into BookTable values('"+ book.BookName+@"','" + book.Author + @"'," + book.Price + @",'" + book.PublishingDate + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BookAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
                return new JsonResult("Added Successfully");
            }
        }

        [HttpDelete("{id:int}")]
        public JsonResult Delete(int id)
        {
            string query = @"
            delete from BookTable Where BookID=" + id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BookAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
                return new JsonResult("Deleted Successfully");
            }
        }
    }
}
