export const Difficulty = (rating) => {
  if(rating >= 3000) {
    return 'difficultyRedBlack';
  } else if(rating >= 2400) {
    return 'difficultyRed';
  } else if(rating >= 2100) {
    return 'difficultyOrange';
  }else if(rating >= 1900) {
    return 'difficultyVoilet';
  }else if(rating >= 1600) {
    return 'difficultyBlue';
  }else if(rating >= 1400) {
    return 'difficultyCyan';
  }else if(rating >= 1200) {
    return 'difficultyGreen';
  } else {
    return 'difficultyGray';
  }
}