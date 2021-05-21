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

  static ValidateEndDate(start_date, end_date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (!end_date) {
      return 'End Date is required';
    }
    if (startDate >= endDate) {
      console.log('here');
      return 'End Date needs to be before Start Date';
    }
    return '';
  }

  static submitEnter(event, formId, handleSubmit) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const form = $(`#${formId}`);

      form.submit((event) => {
        handleSubmit(event);
      });

      form.submit();
    }
  }
}
