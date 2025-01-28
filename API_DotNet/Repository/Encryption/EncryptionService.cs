using API_DotNet.Repository.User;
using System.Security.Cryptography;
using System.Text;

namespace API_DotNet.Repository.Encryption
{
    public class EncryptionService : IEncryptionService
    {
        public string SaltKey(int size = ConstsUser.SizeSaltKey)
        {
            byte[] salt = new byte[size];

            using (var rng = RandomNumberGenerator.Create())
                rng.GetBytes(salt);

            return Convert.ToBase64String(salt);
        }

        public string CreateEncryption(byte[] data, string hashAlgorithm = ConstsUser.hashAlgorithm, int trimByteCount = 0)
        {
            if (string.IsNullOrEmpty(hashAlgorithm.ToString()))
                throw new ArgumentNullException(nameof(hashAlgorithm));

            var algorithm = (HashAlgorithm)CryptoConfig.CreateFromName(hashAlgorithm.ToString())!;
            if (algorithm == null)
                throw new ArgumentException("Unrecognized hash name");

            if (trimByteCount > 0 && data.Length > trimByteCount)
            {
                var newData = new byte[trimByteCount];
                Array.Copy(data, newData, trimByteCount);

                return BitConverter.ToString(algorithm.ComputeHash(newData)).Replace("-", string.Empty);
            }

            return BitConverter.ToString(algorithm.ComputeHash(data)).Replace("-", string.Empty);
        }

        public string ToCheckEncryption(string password, string saltkey, string passwordFormat = ConstsUser.hashAlgorithm)
        {
            return CreateEncryption(Encoding.UTF8.GetBytes(String.Concat(password, saltkey)), passwordFormat);
        }

        public bool IsPasswordDifferent(string newPassword, string existingUserPassword)
        {
            string passwordEncryption = CreateEncryption(Encoding.UTF8.GetBytes(string.Concat(newPassword, ConstsUser.hashAlgorithm)));

            return passwordEncryption.Equals(existingUserPassword);
        }
    }
}
