const getMobilePosition = (groupIndex:number, i:number) => {
    switch(groupIndex) {
      case 0: // Group 0 left
        return { top: `${0 + i*12}%`, left: `${-5 + (i)%2 * 15}%` };
      case 1: // Group 1 middle top left
        return { top: `${5}%`, left: `${45}%` };
      case 2: // Group 2 middle bottom left
        return { bottom: `${ i*10}%`, left: `${3+ (i%2)*20*i}%` };
      case 3: // Group 3 middle top right
        return { top: `${20 + i*6}%`, right: `${5 + i*10}%` };
      case 4: // Group middle bottom right
        return { bottom: `${i*15}%`, right: `${(i%2)*10 -(i+1%2)*3}%` };
      case 5: // Last right
        return { top: `${10 + i*25}%`, right: `${10 - ((i+1)%2 * 3)}%` };
      default:
        return {};
    }
  };

  // Formula for desktop screens (your original)
  const getDesktopPosition = (groupIndex:number, i:number) => {
    switch(groupIndex) {
      case 0:
        return { top: `${20 + i*10}%`, left: `${-5 + i*20}%` };
      case 1:
        return { top: `${5 + i*5}%`, left: `${30 - i*5}%` };
      case 2:
        return { bottom: `${1 + i*5}%`, left: `${20 + i*3}%` };
      case 3:
        return { top: `${10 + i*5}%`, right: `${30 + i*3}%` };
      case 4:
        return { bottom: `${i*5*2}%`, right: `${40 - i*20}%` };
      case 5:
        return { top: `${8 + i*30}%`, right: `${15 - ((i+1)%2 * 5)}%` };
      default:
        return {};
    }
  };

  export const getPosition = (groupIndex:number, i:number,isMobile:boolean) => {
    return isMobile 
      ? getMobilePosition(groupIndex, i)
      : getDesktopPosition(groupIndex, i);
  };