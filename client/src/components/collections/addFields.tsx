import Editor from '@monaco-editor/react';

const options = {
  selectOnLineNumbers: true,
  minimap: {
    enabled: false,
  },
  autoClosingBrackets: 'always',
  autoClosingDelete: 'always',
  trimAutoWhitespace: true,
  autoClosingQuotes: 'always',
  formatOnPaste: true,
  fontSize: 16,
  wordWrap: 'on',
  lineNumbers: 'off',
} as const;

type AddFieldProps = {
  handleEditorChange: (value: string) => void;
};

const AddField = ({ handleEditorChange }: AddFieldProps) => {
  return (
    <Editor
      height="200px"
      options={options}
      defaultLanguage="json"
      defaultValue={'{\n\t"key": "value"\n}'}
      onChange={(value) => handleEditorChange(value || '')}
    />
  );
};

export default AddField;
