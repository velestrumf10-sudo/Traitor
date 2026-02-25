// MatchmakingSystem.js

/**
 * Hybrid Matchmaking System for AI vs Real Players
 */

class MatchmakingSystem {
    constructor() {
        this.players = [];
        this.aiPlayers = [];
    }

    /**
     * Add a player to the matchmaking system.
     * @param {string} playerId - The ID of the player to add.
     * @param {boolean} isAI - Indicates if the player is an AI.
     */
    addPlayer(playerId, isAI = false) {
        if (isAI) {
            this.aiPlayers.push(playerId);
        } else {
            this.players.push(playerId);
        }
    }

    /**
     * Match players into games, considering the presence of AI opponents.
     */
    matchPlayers() {
        const matches = [];
        const playerCount = this.players.length;
        const aiCount = this.aiPlayers.length;

        // If there are enough players, create matches
        if (playerCount >= 2) {
            while (this.players.length >= 2) {
                const player1 = this.players.pop();
                const player2 = this.players.pop();
                matches.push([player1, player2]);
            }
        }

        // If there are AI players available, match them with real players
        this.players.forEach(player => {
            if (this.aiPlayers.length > 0) {
                const aiPlayer = this.aiPlayers.pop();
                matches.push([player, aiPlayer]);
            }
        });

        return matches;
    }
}

// Example usage:
const matchmaking = new MatchmakingSystem();
matchmaking.addPlayer('Player1');
matchmaking.addPlayer('Player2');
matchmaking.addPlayer('AI1', true);
const games = matchmaking.matchPlayers();
console.log(games); // Output the matches
