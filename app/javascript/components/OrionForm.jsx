// This is just a wrapper around 'Form' that allows all errors returned from server
// to be automatically rendered below the corresponding control
// it does that by processing all children elements and applying css and html
// to corresponding elements with errors

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormUtils from '../common/FormUtils';
import { Form } from 'react-bootstrap';
export default class OrionForm extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    const {
      formId,
      handleSubmit,
      errors,
      children,
      className
    } = this.props

    let processedChildren = processChildren(children)

    window.childs = children

    return (
      <Form
      noValidate
      id={formId}
      onSubmit={handleSubmit}
      onKeyPress={(event) => FormUtils.submitEnter(event, formId, handleSubmit)}
      >
      {processedChildren}
      </Form>
    );

    function applyErrorTo(element) {
      // renders a div with error at the end of the formControl that's child of 'element'
      let invalidatedControls = invalidateFormControls(element)
      invalidatedControls.push(errorDivFor(element));

      return React.cloneElement(
        element,
        { ...element.props, key: element.props.controlId },
        invalidatedControls
      )
    };

    function invalidateFormControls(element, controlId) {
      // adds is-invalid class to all children of type 'FormControl'
      return element.props.children.map(function(element, index) {
        if (isFormControl(element)) {
          return addClassTo("is-invalid", element, `${index}-${controlId}`);
        } else {
          return element;
        }
      });
    }

    function isFormControl(element) {
      // Select inputs are 'StateManager'
      return element.type.displayName === "FormControl" || element.type.name === "StateManager"
    }

    function addClassTo(cssClass, element, uniqueKey) {
      let className = element.props.className + ` ${cssClass}`
      let key = `invalid-${uniqueKey}`

      return React.cloneElement(element, { ...element.props, className: className, key: key })
    }

    function errorDivFor(element) {
      return <div className="invalid-feedback" key={`errorbox-for-${element.props.controlId}`}>{errors[element.props.controlId].join('; ')}</div>
    }

    function elementHasError(element) {
      return React.isValidElement(element) && 
        element.type.displayName === "FormGroup" && 
          errors[element.props.controlId]
    }

    function processChildren(children) {
      return children.map(function(element) {
        // If element is a wrapper element, process recursively
        if (React.isValidElement(element) && isWrapper(element)) {
          return React.cloneElement(
            element,
            element.props,
            processChildren(element.props.children)
          )
        }

        return elementHasError(element) ? applyErrorTo(element) : element;
      });
    }

    function isWrapper(element) {
      return React.isValidElement(element) &&
        element.props.inputwrapper === "true"
    }
  }
}

OrionForm.propTypes = {
  formId: PropTypes.string,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  className: PropTypes.string
};
