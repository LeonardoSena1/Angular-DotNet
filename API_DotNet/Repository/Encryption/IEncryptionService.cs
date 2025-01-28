using API_DotNet.Repository.User;

namespace API_DotNet.Repository.Encryption
{
    public interface IEncryptionService
    {
        string SaltKey(int size = ConstsUser.SizeSaltKey);
        string CreateEncryption(byte[] data, string hashAlgorithm = ConstsUser.hashAlgorithm, int trimByteCount = 0);
        string ToCheckEncryption(string password, string saltkey, string passwordFormat = ConstsUser.hashAlgorithm);
        bool IsPasswordDifferent(string newPassword, string existingUserPassword);
    }
}
