using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            IQueryable<Activity> activitiesQuery = context.Activities
                .Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId()));            
                //.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
                //.ToListAsync(cancellationToken);

            if (request.Filter == "past")
            {
                activitiesQuery = activitiesQuery.Where(x => x.Date <= DateTime.UtcNow);
            }
            if (request.Filter == "future")
            {
                activitiesQuery = activitiesQuery.Where(x => x.Date >= DateTime.UtcNow);
            }
            if (request.Filter == "hosting")
            {
                activitiesQuery = activitiesQuery.Where(x => x.Attendees.Any(x => x.IsHost == true ));
            }
            
            var activities = await activitiesQuery
            .OrderBy(x => x.Date)
            .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

            if (activities == null) return Result<List<UserActivityDto>>.Failure("Activities not found", 404);
            

            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}
