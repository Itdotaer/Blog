using System.Security.Cryptography;
using System.Text;

namespace Blog.Core.Common.Helpers
{
    public class MD5Encorpy
    {
        private static MD5 _md5Hash;

        private static void SetMd5Instance()
        {
            if (_md5Hash == null)
            {
                _md5Hash = MD5.Create();
            }
        }

        public static string GetMd5Hash(string input)
        {
            SetMd5Instance();

            // Convert the input string to a byte array and compute the hash.
            var data = _md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            foreach (byte t in data)
            {
                sBuilder.Append(t.ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}
