import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
    fontSize: 17,
    width: 120,
  },
  topcoderLikeCircle: {
    marginTop: 4,
    border: 0.3,
    borderStyle: 'solid',
    borderRadius: 50,
    // color: '#808080',
    height: 12,
    width: 12,
    marginRight: 5,
    display: 'inline-block'
  },
}));

const DifficultyCircle = ({ percentage, diffRating, colour}) => {
  const classes = useStyles({colour});

  return (
    <span style={{display: 'inline-block'}}>
      <Tooltip title={`Difficulty: ${diffRating} `} arrow>
        <span style={{color: `${colour}`, background: `linear-gradient(to top, ${colour} 0%, ${colour} ${percentage}%, #ffffff ${percentage}%, #ffffff 100%)`}} className={classes.topcoderLikeCircle} />
      </Tooltip>
    </span>
  )
}

export default DifficultyCircle