import _ from 'lodash';
import moment from 'moment';
import React from 'react';

export const requiredLabel = (label) => {
  return (
    <span>
      {label} <span style={{ color: '#ff0000ad' }}>*</span>
    </span>
  );
};

export const findInArr = (array, value, keyReturn) => {
  if (array && array.length > 0) {
    let result = array.find((item) => item.id * 1 === value * 1);
    return result ? (keyReturn && result?.[keyReturn] ? result[keyReturn] : result) : undefined;
  }
};

export const differentObject = (object, base) => {
  const changes = (object, base) => {
    return _.transform(object, (result, value, key) => {
      if (_.isArray(value)) {
        if (!_.isEqual(value, base[key])) {
          result[key] = value;
        }
      } else {
        if (!value && !base[key]) {
        } else {
          if (!_.isEqual(value, base[key])) {
            result[key] =
              !(value instanceof Date) && _.isObject(value) && _.isObject(base[key])
                ? changes(value, base[key])
                : value;
          }
        }
      }
    });
  };
  return changes(object, base);
};

export function unAccent(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const checkDisableFrom = (start, field, form) => {
  if (start.valueOf() > moment().valueOf()) {
    return true;
  }

  const end = form.getFieldValue(field);
  if (!start || !end) {
    return false;
  }

  return start.valueOf() > end.valueOf();
};

export const checkDisableTo = (end, field, form) => {
  if (end.valueOf() > moment().valueOf()) {
    return true;
  }

  const start = form.getFieldValue(field);
  if (!start || !end) {
    return false;
  }

  return end.valueOf() <= start.valueOf();
};

export const transformDateToString = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const transformStringToDate = (string) => {
  return moment(string);
};

export const formatDate = (string) => {
  const isValid = moment(string).isValid();
  if (isValid) {
    return moment(string).format('MM/DD/YYYY');
  }

  return 'Chưa xác định';
};


export const renderArtistFromList = (artistList) => {
  if(!Array.isArray(artistList) || artistList.length === 0) return ''
  return `[${artistList.map(artist => artist.fullName).join(', ')}]`
}