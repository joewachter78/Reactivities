using System;
using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SQLitePCL;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);

        _cloudinary = new Cloudinary(account);
    }

    public async Task<string> DeletePhoto(string publicId)
    {
        var deleteParam = new DeletionParams(publicId);

        var result = await _cloudinary.DestroyAsync(deleteParam);

        if (result.Error != null)
        {
            throw new Exception(result.Error.Message);
        }

        return result.Result;
    }

    public async Task<PhotoUploadResults?> UploadPhoto(IFormFile file)
    {
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();

            var uploadParam = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                //Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                Folder = "Reactivities2025"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParam);

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new PhotoUploadResults
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }
        return null;
    }
}
