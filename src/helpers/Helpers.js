export function processDonationsAndStudents(donations, students) {
  const studentMap = {};

  students.forEach((student) => {
    studentMap[student.id] = { name: student.name, id: student.id, grade: student.grade, donations: 0 };
  });

  donations.forEach((donation) => {
    if (studentMap[donation.student]) {
      studentMap[donation.student].donation += donation.donation;
    }
  });

  return Object.values(studentMap);
}

export const findKeyOfLargestNumber = (obj) => {
  let maxKey = null;
  let maxValue = -Infinity;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'number' && obj[key] > maxValue) {
      maxValue = obj[key];
      maxKey = key;
    }
  }
  return maxKey;
};

export const findLargestNumber = obj => {
  let largestNumber = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
      largestNumber = Math.max(largestNumber, obj[key]);
    }
  }
  return largestNumber;
}

export const generateOrderedLists = (totalDonations) => {
  const orderedGrades = Object.keys(totalDonations).map((key) => ({
    grade: key.replace('grade', ''),
    cans: totalDonations[key],
  }));

  orderedGrades.sort((a, b) => b.donations - a.donations);

  return orderedGrades;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};