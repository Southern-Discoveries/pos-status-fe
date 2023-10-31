import {
  ComponentMultiStyleConfig,
  ComponentStyleConfig,
  StyleFunctionProps,
  calc,
  extendTheme,
} from '@chakra-ui/react';
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
      borderBottom: '0.188rem solid',
      borderBottomColor: 'primary.a.500',
      _hover: {
        borderBottomColor: 'primary.a.600',
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
        h: calc('100vh').subtract('115px').toString(),
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
const theme = extendTheme({
  colors,
  components: {
    Button,
    Checkbox,
    Radio,
    Textarea,
    Tabs,
  },
});

export default theme;
