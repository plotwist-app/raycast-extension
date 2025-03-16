/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Plotwist
 * OpenAPI spec version: 0.1.0
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  PostLogin200,
  PostLogin400,
  PostLoginBody
} from './endpoints.schemas';

import { axiosInstance } from './axios';





/**
 * User login with login and password
 */
export const postLogin = (
    postLoginBody: PostLoginBody,
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<PostLogin200>(
      {url: `/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postLoginBody, signal
    },
      );
    }
  


export const getPostLoginMutationOptions = <TError = PostLogin400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: PostLoginBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: PostLoginBody}, TContext> => {
    
const mutationKey = ['postLogin'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postLogin>>, {data: PostLoginBody}> = (props) => {
          const {data} = props ?? {};

          return  postLogin(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postLogin>>>
    export type PostLoginMutationBody = PostLoginBody
    export type PostLoginMutationError = PostLogin400

    export const usePostLogin = <TError = PostLogin400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: PostLoginBody}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postLogin>>,
        TError,
        {data: PostLoginBody},
        TContext
      > => {

      const mutationOptions = getPostLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    