interface Progress {
    level?: number;
    score?: number;
    isComplete?: boolean;
    isCompleteSeason?: number
    seasons?: Season[];
}

interface Season {
    season?: number;
    score?: number;
    isComplete?: boolean;
    isSelected?: boolean;
}

class CurrenLevel {
    progress: Progress[];

    constructor(progress: Progress[]) {
        this.progress = progress;
    }

    setSeason(season: Season, progressLevel: number | undefined) {
        let targetProgress = this.progress.find(p => p.level === progressLevel);

        if (targetProgress) {
            if (!targetProgress.seasons) {
                targetProgress.seasons = [];
            }
            targetProgress.seasons.push(season);
        } else {
            const newProgress: Progress = {
                level: progressLevel,
                seasons: [season]
            };
            this.progress.push(newProgress);
        }
    }

    updateProgress(updatedProgress: Progress) {
        const targetProgress = this.progress.find(p => p.level === updatedProgress.level);
        if(targetProgress) {
            targetProgress.level = updatedProgress.level;
            targetProgress.score = updatedProgress.score;
            targetProgress.isComplete = targetProgress.isComplete;
            if(targetProgress.seasons) {
                targetProgress.seasons = updatedProgress.seasons;
            }
        } else {
            this.progress.push(updatedProgress);
        }
    }

    updateSeason(season: Season, progressLevel: number) {
        let targetProgress = this.progress.find(p => p.level === progressLevel);

        if (targetProgress && targetProgress.seasons) {
            let targetSeason = targetProgress.seasons.find(s => s.season === season.season);

            if (targetSeason) {
                // Update the existing season
                targetSeason.score = season.score;
                targetSeason.isComplete = season.isComplete;
                targetSeason.isSelected = season.isSelected;
            } else {
                // Add the new season if it doesn't exist
                targetProgress.seasons.push(season);
            }
        } else if (targetProgress) {
            // If there are no seasons, create a new one
            targetProgress.seasons = [season];
        } else {
            // If there's no progress at this level, create a new one
            const newProgress: Progress = {
                level: progressLevel,
                seasons: [season]
            };
            this.progress.push(newProgress);
        }
    }

    toPlainObject() {
        return {
            progress: this.progress
        };
    }

    static fromPlainObject(obj: any) {
        return new CurrenLevel(obj.progress);
    }
}


export { CurrenLevel,Progress, Season}