/* global $ */

export default class FormUtils {
  static buildOptions(options) {
    return options.map((option) => this.buildOption(option));
  }

  static buildOption(option) {
    return { value: option, label: option };
  }

  static blockNonNum(event) {
    if (event.key === 'e' || event.key === 'E' || event.key === '.') {
      event.preventDefault();
    }
  }

  static validateEndDate(startingDate, endingDate) {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    if (!endingDate) {
      return 'End Date is required';
    }
    if (startDate >= endDate) {
      return 'End Date needs to be before Start Date';
    }
    return '';
  }

  static submitEnter(event, formId, handleSubmit) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const form = $(`#${formId}`);

      form.submit((formEvent) => {
        handleSubmit(formEvent);
      });

      form.submit();
    }
  }
}
