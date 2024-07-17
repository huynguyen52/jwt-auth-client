import BasicFormik from '../../components/basic-formik';
import BasicPopover from '../../components/basic-popover';

export default function HandsOn() {
  return (
    <div>
      <h1>Hands On</h1>
      <p>
        This is a hands-on page. You can use this page to test your components.
      </p>
      <BasicPopover />
      <BasicFormik />
    </div>
  );
}
