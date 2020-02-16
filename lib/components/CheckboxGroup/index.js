import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-native-material-ui';
import _ from 'lodash';

import LabelError from '../LabelError';
import CustomInput from '../CustomInput';

import styles from './styles';

export default class CheckboxGroup extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    onCheckboxValueChanged: PropTypes.func,
    value: PropTypes.any,
    other: PropTypes.bool,
    otherlabel: PropTypes.string,
    toggle: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    label: '',
    onCheckboxValueChanged: () => { },
    other: false,
    toggle: false,
    value: {
      regular: [],
    },
    otherlabel: 'Other',
    error: false,
    disabled: false,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: this.props.value,
    };
  }

  onOtherTextChanged = (text) => {
    const { onCheckboxValueChanged } = this.props;
    const { selectedValues } = this.state;
    const clonedValues = _.cloneDeep(selectedValues);
    clonedValues.other.value = text;
    this.setState({
      selectedValues: clonedValues,
    }, () => {
      onCheckboxValueChanged(clonedValues);
    });
  };

  onCheckChanged = (value, checked) => {
    const { onCheckboxValueChanged } = this.props;
    const { selectedValues } = this.state;
    const clonedValues = _.cloneDeep(selectedValues);
    if (checked) {
      if (value === 'other') {
        clonedValues.other = {
          value: '',
        };
      } else {
        clonedValues.regular.push(value);
      }
    } else if (value === 'other') {
      // remove other field from state
      delete clonedValues.other;
    } else {
      // remove selected item from regular
      const index = clonedValues.regular.indexOf(value);
      if (index !== -1) {
        clonedValues.regular.splice(index, 1);
      }
    }
    this.setState({
      selectedValues: clonedValues,
    }, () => {
      onCheckboxValueChanged(clonedValues);
    });
  };

  renderOtherInput = () => {
    const { selectedValues } = this.state;
    if (selectedValues.other) {
      return (
        <CustomInput
          keyboardType="default"
          validation={(v) => v}
          onChangeText={this.onOtherTextChanged}
        />
      );
    }
    return null;
  };

  render() {
    console.log('CHECKBOX', this.props);
    const {
      label,
      options,
      other,
      otherlabel,
      toggle,
      error,
      disabled,
    } = this.props;
    console.log(otherlabel);
    const { theme } = this.context;
    const propsValue = this.props.value;
    return (
      <View>
        <LabelError
          label={label}
          error={error}
        />
        <View style={styles.checkboxContainer}>
          {
            _.map(options, (value) => (
              toggle
                ? (
                  <View
                    style={[
                      styles.switchRow,
                      {
                        paddingTop: toggle ? 10 : 0,
                      },
                    ]}
                    key={`${_.get(value, 'value')}`}
                  >
                    <Switch
                      onValueChange={(checked) => {
                        this.onCheckChanged(_.get(value, 'value'), checked);
                      }}
                      thumbColor={theme.toggle.knobColor}
                      trackColor={theme.toggle.tintColor}
                      disabled={disabled}
                      value={propsValue.regular.indexOf(_.get(value, 'value')) !== -1}
                    />
                    <Text style={styles.toggleText}>
                      {_.get(value, 'label')}
                    </Text>
                  </View>
                )
                : (
                  <View key={`${_.get(value, 'value')}`}>
                    <Checkbox
                      label={_.get(value, 'label')}
                      value={_.get(value, 'value')}
                      checked={propsValue.regular.indexOf(_.get(value, 'value')) !== -1}
                      disabled={disabled}
                      onCheck={(checked) => {
                        this.onCheckChanged(_.get(value, 'value'), checked);
                      }}
                    />
                  </View>
                )
            ))
          }
          {
            other
              ? (
                <View style={styles.otherRow}>
                  {
                  toggle
                    ? (
                      <View style={styles.switchRow}>
                        <Switch
                          thumbColor={theme.toggle.knobColor}
                          trackColor={theme.toggle.tintColor}
                          onValueChange={(checked) => {
                            this.onCheckChanged('other', checked);
                          }}
                          value={!!propsValue.other}
                          disabled={disabled}
                        />
                        <Text style={styles.toggleText}>
                          Other
                        </Text>
                      </View>
                    )
                    : (
                      <Checkbox
                        label={otherlabel}
                        value="other"
                        disabled={disabled}
                        checked={!!propsValue.other}
                        onCheck={(checked) => {
                          this.onCheckChanged('other', checked);
                        }}
                      />
                    )
}
                  <View style={{ flex: 1 }}>
                    {this.renderOtherInput()}
                  </View>
                </View>
              )
              : null
          }
        </View>
      </View>
    );
  }
}
