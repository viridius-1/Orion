/* global $ */

export default class FormUtils {
  static buildOptions(options) {
    return options.map((option) => this.buildOption(option));
  }

  static buildAnnualRevenueOptions(options) {
    const annualRevenueOptions = options.map((option, index) => (
      { label: option.label, value: index }
    ));

    return annualRevenueOptions;
  }

  static buildOption(option) {
    return { label: option, value: option };
  }

  static buildEnumOption(selectedOption, options) {
    if (options.length === 0) {
      return null;
    }

    if (!selectedOption){
      return options[0];
    }

    return options.filter(
      function(item) { return item.value === selectedOption }
    )[0]
  };

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
