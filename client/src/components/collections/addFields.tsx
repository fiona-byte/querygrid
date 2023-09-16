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
  tabSize: 2,
  wordWrap: 'on',
  lineNumbers: 'off',
} as const;

type AddFieldProps = {
  handleEditorChange: (value: string) => void;
  editorValue?: unknown;
};

const AddField = ({ handleEditorChange, editorValue }: AddFieldProps) => {
  return (
    <Editor
      height="200px"
      options={options}
      defaultLanguage="json"
      defaultValue={editorValue ? JSON.stringify(editorValue, null, 2) : '{\n\t"key": "value"\n}'}
      onChange={(value) => handleEditorChange(value || '')}
    />
  );
};

export default AddField;
