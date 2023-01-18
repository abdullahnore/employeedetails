function custom(data) {
  if (data == "name") {
    return byname;
  } else if (data == "email") {
    return byemail;
  } else if (data == "address") {
    return byaddress;
  } else if ((data = "phone")) {
    return byphone;
  }
}
function byname(a, b) {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
    return -1;
  } else {
    return 0;
  }
}

function byemail(a, b) {
  if (a.email.toLowerCase() > b.email.toLowerCase()) {
    return 1;
  } else if (b.email.toLowerCase() > a.email.toLowerCase()) {
    return -1;
  } else {
    return 0;
  }
}
function byaddress(a, b) {
  if (a.address.toLowerCase() > b.address.toLowerCase()) {
    return 1;
  } else if (b.address.toLowerCase() > a.address.toLowerCase()) {
    return -1;
  } else {
    return 0;
  }
}
function byphone(a, b) {
  if (a.phone > b.phone) {
    return 1;
  } else if (b.phone > a.phone) {
    return -1;
  } else {
    return 0;
  }
}

module.exports = custom;
