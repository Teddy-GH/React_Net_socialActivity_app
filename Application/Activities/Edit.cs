﻿using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
   public class Edit
    {
        public class Command : IRequest<Result<MediatR.Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<MediatR.Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Find activity from database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null;


                //activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);

              var result =  await _context.SaveChangesAsync() > 0;
                if (!result) return Result<MediatR.Unit>.Failure("Failed to update activity");
                return Result<MediatR.Unit>.Success(MediatR.Unit.Value);

            }
        }
    }
}
