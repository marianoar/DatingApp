import { CanDeactivateFn } from '@angular/router';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfile> = (component) => {
console.log('preventUnsavedChangesGuard called');
console.log('Form dirty state:', component.editForm);
  if(component.editForm?.dirty)
  {
    return confirm('Are you sure you want to continue? Changes will be lost');
  }
return true;
};
