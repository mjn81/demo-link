import { getContactDetail, getContactList } from 'api';
import { IBaseError, IGetContactDetailRes, IGetContactListRes } from 'interfaces';
import { useQuery } from 'react-query';

export const useContactsQuery = (onSuccess: (data: IGetContactListRes) => void) => {
  return useQuery<IGetContactListRes, IBaseError>(
    'contact-list',
    () => getContactList(),
    {
      onSuccess,
    }
  );
};

export const useContactDetailQuery = (contactId: string) => {
  return useQuery<IGetContactDetailRes, IBaseError>(
    ['member-contact-list', contactId],
    () => getContactDetail(contactId),
  );
};
