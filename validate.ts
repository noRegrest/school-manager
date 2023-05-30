import moment from "moment";

type Unboxed<T> = T extends (infer U)[] ? U : T;
type interfaceConfigValue<P> = {
  type: "string" | "number" | "date" | "bool" | "object" | "array";
  displayName?: string;
  required?: boolean;
  min?: number | Date;
  max?: number | Date;
  format?: string;
  minLength?: number;
  maxLength?: number;
  detail?: {
    type?: "string" | "number" | "date" | "bool" | "object";
    config?: interfaceConfig<Unboxed<P>>;
  };
};

type interfaceConfig<Entity> = {
  [P in keyof Entity]?: interfaceConfigValue<Entity[P]>;
};

const MessageCommon = {
  isNotEmpty: "This field is required.",
  minLength: "Please enter a value less than or equal to {0}.",
  maxLength: "Please enter a value greater than or equal to {0}.",
  isNumeric: "Please enter a valid number.",
  isDate: "Please enter a valid date.",
  min: "Please enter a value less than or equal to {0}",
  max: "Please enter a value less than or equal to {0}.",
  isArray: "Please enter a valid array.",
  doesNotExist: "Record doesn't exist.",
};

declare global {
  interface String {
    format(...args: any[]): string;
  }
}

String.prototype.format = function (...args: string[]): string {
  // use replace to iterate over the string
  // select the match and check if the related argument is present
  // if yes, replace the match with the argument
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == "undefined" ? match : args[index];
  });
};

export const validate = <Entity>(
  _data: any,
  _config: interfaceConfig<Entity>,
  isRemove: boolean = true
): { status: boolean; data: any; errors: string[] } => {
  var response: { status: boolean; data: any; errors: string[] } = {
    status: false,
    data: _data,
    errors: [],
  };
  try {
    var errors: string[] = [];
    if (_config == undefined) {
      _config = {};
      errors.push(`config doesn't exist`);
      response.errors = errors;
      return response;
    }
    if (_data == undefined) {
      _data = {};
      response.data = _data;
      errors.push(`data doesn't exist`);
      response.errors = errors;
      return response;
    }

    var _dataTemp: any = {};
    var dataKeys = Object.keys(_config);
    for (const dataKey of dataKeys) {
      var config = (_config as any)[dataKey] as interfaceConfigValue<Entity>;
      var value = _data[dataKey];
      if (config == undefined) {
        if (isRemove == true) delete _data[dataKey];
        continue;
      }
      if (config.type == undefined) config.type = "string";
      if (config.required == undefined) config.required = false;
      switch (config.type) {
        case "string":
          if (value == undefined) value = "";
          // required
          if (config.required && config.required == true) {
            var error = isNotEmpty(config.displayName ?? dataKey, value);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }
          value = value.toString();
          // min length
          if (config.minLength) {
            var error = minLength(
              config.displayName ?? dataKey,
              value,
              config.minLength
            );
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }

          // max length
          if (config.maxLength) {
            var error = maxLength(
              config.displayName ?? dataKey,
              value,
              config.maxLength
            );
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }

          break;
        case "number":
          if (
            (value != undefined && value.toString().length > 0) ||
            (config.required && config.required == true)
          ) {
            var error = isNotEmpty(config.displayName ?? dataKey, value);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
            var error = isNumeric(config.displayName ?? dataKey, value);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
            value = error.data;

            // min
            if (config.min) {
              var error = min(config.displayName ?? dataKey, value, config.min);
              if (error.status == false) {
                errors.push(error.message ?? "");
                break;
              }
            }

            // max
            if (config.max) {
              var error = max(config.displayName ?? dataKey, value, config.max);
              if (error.status == false) {
                errors.push(error.message ?? "");
                break;
              }
            }
          } else if (value != undefined && value.toString().length == 0) {
            value = null;
          }
          break;
        case "date":
          // process value
          var error = isNotEmpty(config.displayName ?? dataKey, value);
          if (error.status == false) {
            if (config.required && config.required == true)
              errors.push(error.message ?? "");
            value = null;
            break;
          }

          // date valid
          var error1 = isDate(
            config.displayName ?? dataKey,
            value,
            config.format ?? "DD/MM/YYYY"
          );
          if (error1.status == false) {
            errors.push(error1.message ?? "");
            break;
          }
          value = error1.data;

          // min
          if (config.min) {
            var error = min(config.displayName ?? dataKey, value, config.min);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }

          // max
          if (config.max) {
            var error = max(config.displayName ?? dataKey, value, config.max);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }
          break;
        case "bool":
          if (value == undefined) value = "";

          // required
          if (config.required && config.required == true) {
            var error = isNotEmpty(config.displayName ?? dataKey, value);
            if (error.status == false) {
              errors.push(error.message ?? "");
              break;
            }
          }

          value = value.toString().toLowerCase();
          // bool valid
          value = value == "true" || value == "1" ? true : false;
          break;

        case "array":
          if (value && !Array.isArray(value)) {
            errors.push(
              `${config.displayName ?? dataKey}: ${MessageCommon.isArray}`
            );
            break;
          }
          // required
          if (config.required && config.required == true) {
            if (!Array.isArray(value) || value.length == 0) {
              errors.push(
                `${config.displayName ?? dataKey}: ${
                  MessageCommon.doesNotExist
                }`
              );
              break;
            }
          }

          // validate item
          if (config.detail && value) {
            for (let index = 0; index < value.length; index++) {
              const dataItem = value[index];
              if (config.detail.config && config.detail.type == "object") {
                var dataError = validate(dataItem, config.detail.config);
                if (dataError.status == false) {
                  dataError.errors.forEach((item) =>
                    errors.push(
                      `${config.displayName ?? dataKey}[${index}] -> ${item}`
                    )
                  );
                  break;
                }
                value[index] = dataError.data;
              } else {
                var dataError = validate(
                  {
                    item: dataItem,
                  },
                  {
                    item: {
                      type: config.detail.type as any,
                      required: config.required,
                    },
                  }
                );
                if (dataError.status == false) {
                  dataError.errors.forEach((item) =>
                    errors.push(
                      `${config.displayName ?? dataKey}[${index}] -> ${item}`
                    )
                  );
                  break;
                }
                value[index] = dataError.data.item;
              }
            }
          }
          break;
        case "object":
          // required
          if (config.required && config.required == true) {
            if (
              value == undefined ||
              (value && Object.keys(value).length == 0)
            ) {
              errors.push(
                `${config.displayName ?? dataKey}: ${
                  MessageCommon.doesNotExist
                }`
              );
              break;
            }
          }

          if (config.detail == undefined || config.detail.config == undefined) {
            errors.push(
              `${config.displayName ?? dataKey} config: ${
                MessageCommon.doesNotExist
              }`
            );
            break;
          }

          if (value) {
            var dataError = validate(value, config.detail.config);
            if (dataError.status == false) {
              dataError.errors.forEach((item) =>
                errors.push(`${config.displayName ?? dataKey} -> ${item}`)
              );
              break;
            }
            value = dataError.data;
          }
          break;
        default:
          break;
      }
      _dataTemp[dataKey] = value;
    }

    if (errors.length > 0) {
      response.status = false;
      response.errors = errors;
      return response;
    }
    response.status = true;
    response.data = _dataTemp;
    return response;
  } catch (error) {
    console.log(error);
    return response;
  }
};

function isNotEmpty(
  key: string,
  value: any | string | boolean
): { status: boolean; message?: string; data?: number } {
  if (
    (typeof value == "string" && value.length == 0 && value == "") ||
    (typeof value == "boolean" && value == undefined)
  )
    return {
      status: false,
      message: `${key}: ${MessageCommon.isNotEmpty}`,
    };
  return { status: true };
}

function minLength(
  key: string,
  value: string,
  length: number
): { status: boolean; message?: string; data?: number } {
  if (value == undefined || value.length < length) {
    return {
      status: false,
      message: `${key}: ${MessageCommon.minLength.format(length)}`,
    };
  }
  return {
    status: true,
  };
}

function maxLength(
  key: string,
  value: string,
  length: number
): { status: boolean; message?: string; data?: number } {
  if (value == undefined || value.length > length)
    return {
      status: false,
      message: `${key}: ${MessageCommon.maxLength.format(length)}`,
    };
  return { status: true };
}

function isNumeric(
  key: string,
  value: any | string
): { status: boolean; message?: string; data?: number } {
  var isValid = /^[+-]?(\d+|)(\.\d+)?$/.test(value);
  if (isValid == false)
    return {
      status: false,
      message: `${key}: ${MessageCommon.isNumeric}`,
    };
  return {
    status: true,
    data: parseFloat(value),
  };
}

function min(
  key: string,
  value: number | Date,
  compare: number | Date
): { status: boolean; message?: string; data?: number } {
  if (value < compare)
    return {
      status: false,
      message: `${key}: ${MessageCommon.min.format(compare)}`,
    };
  return { status: true };
}

function max(
  key: string,
  value: number | Date,
  compare: number | Date
): { status: boolean; message?: string; data?: number } {
  if (value > compare)
    return {
      status: false,
      message: `${key}: ${MessageCommon.max.format(compare)}`,
    };
  return { status: true };
}

function isDate(
  key: string,
  value: any | string,
  format: string
): { status: boolean; message?: string; data?: Date } {
  var dateValid = moment(value, format);
  var isValid = dateValid.isValid();
  if (isValid == false)
    return {
      status: false,
      message: `${key}: ${MessageCommon.isDate}`,
    };
  return {
    status: true,
    data: dateValid.toDate(),
  };
}
