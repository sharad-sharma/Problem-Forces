export const DifficultyPercentage = (rating) => {
    if(rating >= 3000) {
      return 100;
    } else if(rating >= 2400) {
        let num = (rating - 2400) * 100;
        let deno = (3000 - 2400);
        return num / deno;
    } else if(rating >= 2100) {
        let num = (rating - 2100) * 100;
        let deno = (2400 - 2100);
        return num / deno;
    }else if(rating >= 1900) {
        let num = (rating - 1900) * 100;
        let deno = (2100 - 1900);
        return num / deno;
    }else if(rating >= 1600) {
        let num = (rating - 1600) * 100;
        let deno = (1900 - 1600);
        return num / deno;
    }else if(rating >= 1400) {
        let num = (rating - 1400) * 100;
        let deno = (1600 - 1400);
        return num / deno;
    }else if(rating >= 1200) {
        let num = (rating - 1200) * 100;
        let deno = (1400 - 1200);
        return num / deno;
    } else {
        let num = (rating - 0) * 100;
        let deno = (1200 - 0);
        return num / deno;
    }
  }