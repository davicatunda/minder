import { Tooltip, Typography } from "@material-ui/core";

export default function MemoryVaultLoadingState() {
  return (
    <Tooltip
      title="This app uses a free tier Heroku Dyno and will sleep after 30 minutes of inactivity"
      arrow
    >
      <Typography variant="body1" display="inline">
        Warming up the server just for you...
      </Typography>
    </Tooltip>
  );
}
