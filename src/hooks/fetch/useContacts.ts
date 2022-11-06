import { getContactDetail, getContactList } from 'api';
import { IBaseError, IGetContactDetailRes, IGetContactListRes } from 'interfaces';
import { useQuery } from 'react-query';

export const useContactsQuery = () => {
  return useQuery<IGetContactListRes, IBaseError>('contact-list', () => getContactList());
};

export const useContactDetailQuery = (contactId: string) => {
  return useQuery<IGetContactDetailRes, IBaseError>(
    ['member-contact-list', contactId],
    () => getContactDetail(contactId),
  );
};
