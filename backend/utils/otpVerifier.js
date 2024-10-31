export const otpVerifier = (otptime) => {
  try {
    const cDateTime = new Date();
    let timeleft = (otptime - cDateTime.getTime()) / 1000;
    timeleft /= 60;
    const minutes = Math.abs(timeleft);
    if (minutes > 3) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
