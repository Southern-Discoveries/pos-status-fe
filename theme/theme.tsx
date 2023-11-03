import {
  ComponentMultiStyleConfig,
  ComponentStyleConfig,
  StyleFunctionProps,
  extendTheme,
} from '@chakra-ui/react';

/// Animation Style Setting
const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};
////---------------------

export const colors = {
  primary: {
    a: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
  },
  shader: {
    a: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
    },
  },
  secondary: {
    red: '#FF4444',
  },
};
const Button: ComponentStyleConfig = {
  variants: {
    icon_btn: (props: StyleFunctionProps) => ({
      borderRadius: 'full',
      border: '0.063rem solid',
      borderColor: props.isActive ? 'primary.a.500' : 'shader.a.300',
      bg: props.isActive ? 'primary.a.500' : 'white',
      padding: 2.5,
      svg: {
        // icon svg file
        color: props.isActive ? 'white' : 'shader.a.900',
        height: 5,
        width: 5,
      },
    }),
    primary: {
      paddingX: 4,
      paddingY: 2.5,
      bg: 'primary.a.400',
      color: 'white',
      borderBottom: '0.25rem solid',
      borderBottomColor: 'primary.a.500',
      borderRadius: 'xl',
      _hover: {
        borderBottomColor: 'primary.a.600',
      },
    },
    sign_in: {
      border: '0.063rem solid',
      borderColor: 'shader.a.300',
      px: 3,
      py: 2.5,
      svg: {
        width: 6,
        height: 6,
      },
    },
  },
};
const Textarea: ComponentStyleConfig = {
  variants: {
    chat_input: {
      bg: 'white',
      resize: 'none',
      height: '3.5rem',
      maxHeight: '12.5rem',
      overflowY: 'hidden',
      py: 4,
      borderRadius: '2xl',
      border: '0.063rem solid ',
      borderColor: 'shader.a.300',
    },
  },
};
const Checkbox: ComponentMultiStyleConfig = {
  variants: {
    primary: {
      container: {
        padding: 3,
        _checked: {
          border: '0.125rem solid',
          borderColor: 'primary.a.400',
          borderRadius: 'xl',
        },
      },
      label: {
        color: 'shader.a.600',
        fontWeight: 'medium',
        fontSize: 'sm',

        _hover: {
          color: 'shader.a.500',
        },
        _checked: {
          color: 'shader.a.900',
          fontWeight: '600',
        },
      },
      icon: {},
      control: {
        borderColor: 'shader.a.600',

        _checked: {
          borderColor: 'primary.a.400',
          bg: 'primary.a.400',
        },
      },
    },
  },
  parts: [],
};
const Radio: ComponentMultiStyleConfig = {
  variants: {
    primary: {
      control: {
        _checked: {
          background: 'white',
          color: 'primary.a.400',
          borderColor: 'primary.a.400',
        },
      },
      label: {},
      container: {
        padding: 3,
        _checked: {
          border: '0.125rem solid',
          borderColor: 'primary.a.400',
          borderRadius: 'xl',
        },
      },
    },
  },
  parts: [],
};
const Tabs: ComponentStyleConfig = {
  variants: {
    right_sidebar: {
      root: {
        h: { md: 'calc(100vh - 145px)', base: 'calc(100vh - 165px)' },
      },

      tab: {
        color: 'shader.a.400',
        fontWeight: 'bold',
        borderBottom: '1px solid',
        borderBottomColor: 'shader.a.300',
        flex: 1,
        py: 4,
        _selected: {
          color: 'shader.a.900',
          borderBottom: '3px solid',
          zIndex: 2,
          borderBottomColor: 'primary.a.400',
        },
      },
      tablist: {
        display: 'flex',
        bg: 'white',
        zIndex: 2,
      },
      tabpanels: {
        padding: 0,
        height: 'full',
        width: 'full',
      },
      tabpanel: {
        padding: 0,
        height: 'full',
        width: 'full',
      },
    },
  },
};

const Form: ComponentStyleConfig = {
  variants: {
    floating_input: {
      container: {
        _focusWithin: {
          label: {
            color: 'shader.a.500',
            ...activeLabelStyles,
          },
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
          {
            ...activeLabelStyles,
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          backgroundColor: 'white',
          pointerEvents: 'none',
          mx: 3,
          px: 1,
          my: 2,
          color: 'shader.a.500',
          transformOrigin: 'left top',
        },
      },
    },
  },
  parts: [],
};
const Input: ComponentStyleConfig = {
  variants: {
    auth: {
      field: {
        bg: 'shader.a.50',
        borderRadius: 'lg',
        border: '0.094rem solid',
        borderColor: 'shader.a.300',
        px: 4,
        py: 3,
        color: 'shader.a.900',
        _invalid: {
          borderColor: 'secondary.red',
        },
      },
    },
  },
};
const Popover: ComponentStyleConfig = {
  variants: {
    chat_edit: {
      content: { right: 0, inset: 0 },
      body: {},
    },
  },
};
const theme = extendTheme({
  colors,
  components: {
    Button,
    Checkbox,
    Radio,
    Textarea,
    Tabs,
    Input,
    Form,
    Popover,
  },
});

export default theme;
