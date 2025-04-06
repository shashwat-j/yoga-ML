import { POINTS } from './data';

export function getAngle(p1, p2, p3) {
  const angle = Math.abs((Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x)) * 180 / Math.PI);
  return angle > 180 ? 360 - angle : angle;
}

export function checkStraightness(p1, p2, p3, threshold = 170) {
  const angle = getAngle(p1, p2, p3);
  console.log("angle ", angle)
  return angle > threshold;
}

export function isHigher(p1, p2, threshold = 5) {
  const heightDiff = p1.y - p2.y;
  console.log("heightDiff ", heightDiff)
  return heightDiff > threshold;
}

export function checkHeight(p1, p2, threshold = 5) {
  const heightDiff = Math.abs(p1.y - p2.y);
  console.log("heightDiff ", heightDiff)
  return heightDiff < threshold;
}

export function getPoseFeedback(keypoints, poseName) {
  const feedback = [];
  
  const leftHip = keypoints[POINTS.LEFT_HIP];
  const leftKnee = keypoints[POINTS.LEFT_KNEE];
  const leftAnkle = keypoints[POINTS.LEFT_ANKLE];
  const rightHip = keypoints[POINTS.RIGHT_HIP];
  const rightKnee = keypoints[POINTS.RIGHT_KNEE];
  const rightAnkle = keypoints[POINTS.RIGHT_ANKLE];
  const leftShoulder = keypoints[POINTS.LEFT_SHOULDER];
  const leftElbow = keypoints[POINTS.LEFT_ELBOW];
  const leftEar = keypoints[POINTS.LEFT_EAR];
  const leftWrist = keypoints[POINTS.LEFT_WRIST];
  const rightShoulder = keypoints[POINTS.RIGHT_SHOULDER];
  const rightElbow = keypoints[POINTS.RIGHT_ELBOW];
  const rightWrist = keypoints[POINTS.RIGHT_WRIST];

  if (poseName === 'Tree') {
    if (!checkStraightness(leftKnee, leftHip, leftShoulder, 170)) {
      feedback.push("Straighten your standing leg");
    }

    if (!checkHeight(rightKnee, rightHip, 5)) {
      feedback.push("Raise your right foot higher");
    }
  }
  else if (poseName === 'Chair') {
    if(getAngle(rightAnkle, rightKnee, rightHip) > 120) {
      feedback.push("Bend Lower");
    }

    if(!checkStraightness(rightShoulder, rightElbow, rightWrist, 160)) {
      feedback.push("Straighten your right arm");
    }

    // console.log("right arm size: ")
    // checkHeight(rightElbow, rightWrist)

    // console.log("hip to knee: ")
    // checkHeight(rightHip, rightKnee)
  }
  else if (poseName === 'Triangle'){
    if(!checkStraightness(leftElbow, leftShoulder, rightShoulder, 170) || 
       !checkStraightness(rightElbow, rightShoulder, leftShoulder, 170) || 
       !checkStraightness(leftWrist, leftElbow, leftShoulder, 170) || 
       !checkStraightness(rightWrist, rightElbow, rightShoulder, 170)) {
      feedback.push("Straighten your arms");
    }
  }
  
  return feedback;
} 