﻿using PillowFight.Api.Models;
using PillowFight.Repositories.Enumerations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PillowFight.Api.Hubs
{
    public interface IGameHubClient
    {
        Task ReceiveAction(CharacterAction characterAction, string resultDescription, IEnumerable<PlayerCharacter> characters);

        Task ReceiveActionOptions(int characterId, IEnumerable<ActionTypeOption> options);

        Task ReceiveAvailableActions(int characterId, IEnumerable<ActionTypeEnum> actions);

        Task ReceiveJoinRoomRequest(GameRoom room, bool hasJoined);

        Task ReceiveNewRoomRequest(GameRoom room);
    }
}
