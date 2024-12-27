export const calculateTimeInHoursMinutesSeconds = (seconds: number): string => {


    if (isNaN(seconds) || seconds < 0) return "Invalid time";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    //remove decomal from seconds
    const remainingSeconds = Math.floor(seconds % 60);


    const formattedTime =
        hours > 0
            ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                2,
                "0"
            )}:${String(Math.floor(remainingSeconds)).padStart(2, "0")}`
            : `${String(minutes).padStart(2, "0")}:${String(
                remainingSeconds
            ).padStart(2, "0")}`;


    return formattedTime;
}