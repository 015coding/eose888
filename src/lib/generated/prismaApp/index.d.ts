
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model BankAccount
 * 
 */
export type BankAccount = $Result.DefaultSelection<Prisma.$BankAccountPayload>
/**
 * Model TransferTransaction
 * 
 */
export type TransferTransaction = $Result.DefaultSelection<Prisma.$TransferTransactionPayload>
/**
 * Model AccountLog
 * 
 */
export type AccountLog = $Result.DefaultSelection<Prisma.$AccountLogPayload>
/**
 * Model Holding
 * 
 */
export type Holding = $Result.DefaultSelection<Prisma.$HoldingPayload>
/**
 * Model TransactionStock
 * 
 */
export type TransactionStock = $Result.DefaultSelection<Prisma.$TransactionStockPayload>
/**
 * Model PinnedStock
 * 
 */
export type PinnedStock = $Result.DefaultSelection<Prisma.$PinnedStockPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Country: {
  THAILAND: 'THAILAND',
  USA: 'USA'
};

export type Country = (typeof Country)[keyof typeof Country]


export const Currency: {
  THB: 'THB',
  USD: 'USD'
};

export type Currency = (typeof Currency)[keyof typeof Currency]


export const TransactionType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  TRANSFER: 'TRANSFER'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const TradeType: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type TradeType = (typeof TradeType)[keyof typeof TradeType]

}

export type Country = $Enums.Country

export const Country: typeof $Enums.Country

export type Currency = $Enums.Currency

export const Currency: typeof $Enums.Currency

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type TradeType = $Enums.TradeType

export const TradeType: typeof $Enums.TradeType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.bankAccount`: Exposes CRUD operations for the **BankAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankAccounts
    * const bankAccounts = await prisma.bankAccount.findMany()
    * ```
    */
  get bankAccount(): Prisma.BankAccountDelegate<ExtArgs>;

  /**
   * `prisma.transferTransaction`: Exposes CRUD operations for the **TransferTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransferTransactions
    * const transferTransactions = await prisma.transferTransaction.findMany()
    * ```
    */
  get transferTransaction(): Prisma.TransferTransactionDelegate<ExtArgs>;

  /**
   * `prisma.accountLog`: Exposes CRUD operations for the **AccountLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountLogs
    * const accountLogs = await prisma.accountLog.findMany()
    * ```
    */
  get accountLog(): Prisma.AccountLogDelegate<ExtArgs>;

  /**
   * `prisma.holding`: Exposes CRUD operations for the **Holding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holdings
    * const holdings = await prisma.holding.findMany()
    * ```
    */
  get holding(): Prisma.HoldingDelegate<ExtArgs>;

  /**
   * `prisma.transactionStock`: Exposes CRUD operations for the **TransactionStock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionStocks
    * const transactionStocks = await prisma.transactionStock.findMany()
    * ```
    */
  get transactionStock(): Prisma.TransactionStockDelegate<ExtArgs>;

  /**
   * `prisma.pinnedStock`: Exposes CRUD operations for the **PinnedStock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PinnedStocks
    * const pinnedStocks = await prisma.pinnedStock.findMany()
    * ```
    */
  get pinnedStock(): Prisma.PinnedStockDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    BankAccount: 'BankAccount',
    TransferTransaction: 'TransferTransaction',
    AccountLog: 'AccountLog',
    Holding: 'Holding',
    TransactionStock: 'TransactionStock',
    PinnedStock: 'PinnedStock'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "bankAccount" | "transferTransaction" | "accountLog" | "holding" | "transactionStock" | "pinnedStock"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      BankAccount: {
        payload: Prisma.$BankAccountPayload<ExtArgs>
        fields: Prisma.BankAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          findFirst: {
            args: Prisma.BankAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          findMany: {
            args: Prisma.BankAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>[]
          }
          create: {
            args: Prisma.BankAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          createMany: {
            args: Prisma.BankAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BankAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          update: {
            args: Prisma.BankAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          deleteMany: {
            args: Prisma.BankAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BankAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          aggregate: {
            args: Prisma.BankAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankAccount>
          }
          groupBy: {
            args: Prisma.BankAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankAccountCountArgs<ExtArgs>
            result: $Utils.Optional<BankAccountCountAggregateOutputType> | number
          }
        }
      }
      TransferTransaction: {
        payload: Prisma.$TransferTransactionPayload<ExtArgs>
        fields: Prisma.TransferTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransferTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransferTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          findFirst: {
            args: Prisma.TransferTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransferTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          findMany: {
            args: Prisma.TransferTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>[]
          }
          create: {
            args: Prisma.TransferTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          createMany: {
            args: Prisma.TransferTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransferTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          update: {
            args: Prisma.TransferTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransferTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransferTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransferTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferTransactionPayload>
          }
          aggregate: {
            args: Prisma.TransferTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransferTransaction>
          }
          groupBy: {
            args: Prisma.TransferTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransferTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransferTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransferTransactionCountAggregateOutputType> | number
          }
        }
      }
      AccountLog: {
        payload: Prisma.$AccountLogPayload<ExtArgs>
        fields: Prisma.AccountLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          findFirst: {
            args: Prisma.AccountLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          findMany: {
            args: Prisma.AccountLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>[]
          }
          create: {
            args: Prisma.AccountLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          createMany: {
            args: Prisma.AccountLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          update: {
            args: Prisma.AccountLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          deleteMany: {
            args: Prisma.AccountLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountLogPayload>
          }
          aggregate: {
            args: Prisma.AccountLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccountLog>
          }
          groupBy: {
            args: Prisma.AccountLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountLogCountArgs<ExtArgs>
            result: $Utils.Optional<AccountLogCountAggregateOutputType> | number
          }
        }
      }
      Holding: {
        payload: Prisma.$HoldingPayload<ExtArgs>
        fields: Prisma.HoldingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findFirst: {
            args: Prisma.HoldingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findMany: {
            args: Prisma.HoldingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          create: {
            args: Prisma.HoldingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          createMany: {
            args: Prisma.HoldingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HoldingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          update: {
            args: Prisma.HoldingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          deleteMany: {
            args: Prisma.HoldingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoldingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          aggregate: {
            args: Prisma.HoldingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHolding>
          }
          groupBy: {
            args: Prisma.HoldingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingCountAggregateOutputType> | number
          }
        }
      }
      TransactionStock: {
        payload: Prisma.$TransactionStockPayload<ExtArgs>
        fields: Prisma.TransactionStockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionStockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionStockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          findFirst: {
            args: Prisma.TransactionStockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionStockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          findMany: {
            args: Prisma.TransactionStockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>[]
          }
          create: {
            args: Prisma.TransactionStockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          createMany: {
            args: Prisma.TransactionStockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransactionStockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          update: {
            args: Prisma.TransactionStockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          deleteMany: {
            args: Prisma.TransactionStockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionStockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionStockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionStockPayload>
          }
          aggregate: {
            args: Prisma.TransactionStockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactionStock>
          }
          groupBy: {
            args: Prisma.TransactionStockGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionStockGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionStockCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionStockCountAggregateOutputType> | number
          }
        }
      }
      PinnedStock: {
        payload: Prisma.$PinnedStockPayload<ExtArgs>
        fields: Prisma.PinnedStockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PinnedStockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PinnedStockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          findFirst: {
            args: Prisma.PinnedStockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PinnedStockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          findMany: {
            args: Prisma.PinnedStockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>[]
          }
          create: {
            args: Prisma.PinnedStockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          createMany: {
            args: Prisma.PinnedStockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PinnedStockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          update: {
            args: Prisma.PinnedStockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          deleteMany: {
            args: Prisma.PinnedStockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PinnedStockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PinnedStockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PinnedStockPayload>
          }
          aggregate: {
            args: Prisma.PinnedStockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePinnedStock>
          }
          groupBy: {
            args: Prisma.PinnedStockGroupByArgs<ExtArgs>
            result: $Utils.Optional<PinnedStockGroupByOutputType>[]
          }
          count: {
            args: Prisma.PinnedStockCountArgs<ExtArgs>
            result: $Utils.Optional<PinnedStockCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    holdings: number
    transactions: number
    pinnedStocks: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    holdings?: boolean | UserCountOutputTypeCountHoldingsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    pinnedStocks?: boolean | UserCountOutputTypeCountPinnedStocksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionStockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPinnedStocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PinnedStockWhereInput
  }


  /**
   * Count Type BankAccountCountOutputType
   */

  export type BankAccountCountOutputType = {
    logs: number
    sentTransfers: number
    receivedTransfers: number
  }

  export type BankAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | BankAccountCountOutputTypeCountLogsArgs
    sentTransfers?: boolean | BankAccountCountOutputTypeCountSentTransfersArgs
    receivedTransfers?: boolean | BankAccountCountOutputTypeCountReceivedTransfersArgs
  }

  // Custom InputTypes
  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccountCountOutputType
     */
    select?: BankAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountLogWhereInput
  }

  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeCountSentTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferTransactionWhereInput
  }

  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeCountReceivedTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferTransactionWhereInput
  }


  /**
   * Count Type TransferTransactionCountOutputType
   */

  export type TransferTransactionCountOutputType = {
    logs: number
  }

  export type TransferTransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | TransferTransactionCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * TransferTransactionCountOutputType without action
   */
  export type TransferTransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransactionCountOutputType
     */
    select?: TransferTransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransferTransactionCountOutputType without action
   */
  export type TransferTransactionCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    idCard: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    idCard: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    birthDate: number
    idCard: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    idCard?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    idCard?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    idCard?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date
    idCard: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    idCard?: boolean
    createdAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    holdings?: boolean | User$holdingsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    pinnedStocks?: boolean | User$pinnedStocksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    idCard?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    holdings?: boolean | User$holdingsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    pinnedStocks?: boolean | User$pinnedStocksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$BankAccountPayload<ExtArgs>[]
      holdings: Prisma.$HoldingPayload<ExtArgs>[]
      transactions: Prisma.$TransactionStockPayload<ExtArgs>[]
      pinnedStocks: Prisma.$PinnedStockPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      birthDate: Date
      idCard: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findMany"> | Null>
    holdings<T extends User$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, User$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany"> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findMany"> | Null>
    pinnedStocks<T extends User$pinnedStocksArgs<ExtArgs> = {}>(args?: Subset<T, User$pinnedStocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly idCard: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    where?: BankAccountWhereInput
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    cursor?: BankAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * User.holdings
   */
  export type User$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    cursor?: HoldingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    where?: TransactionStockWhereInput
    orderBy?: TransactionStockOrderByWithRelationInput | TransactionStockOrderByWithRelationInput[]
    cursor?: TransactionStockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionStockScalarFieldEnum | TransactionStockScalarFieldEnum[]
  }

  /**
   * User.pinnedStocks
   */
  export type User$pinnedStocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    where?: PinnedStockWhereInput
    orderBy?: PinnedStockOrderByWithRelationInput | PinnedStockOrderByWithRelationInput[]
    cursor?: PinnedStockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PinnedStockScalarFieldEnum | PinnedStockScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model BankAccount
   */

  export type AggregateBankAccount = {
    _count: BankAccountCountAggregateOutputType | null
    _avg: BankAccountAvgAggregateOutputType | null
    _sum: BankAccountSumAggregateOutputType | null
    _min: BankAccountMinAggregateOutputType | null
    _max: BankAccountMaxAggregateOutputType | null
  }

  export type BankAccountAvgAggregateOutputType = {
    balance: Decimal | null
  }

  export type BankAccountSumAggregateOutputType = {
    balance: Decimal | null
  }

  export type BankAccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    country: $Enums.Country | null
    currency: $Enums.Currency | null
    balance: Decimal | null
    createdAt: Date | null
  }

  export type BankAccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    country: $Enums.Country | null
    currency: $Enums.Currency | null
    balance: Decimal | null
    createdAt: Date | null
  }

  export type BankAccountCountAggregateOutputType = {
    id: number
    userId: number
    country: number
    currency: number
    balance: number
    createdAt: number
    _all: number
  }


  export type BankAccountAvgAggregateInputType = {
    balance?: true
  }

  export type BankAccountSumAggregateInputType = {
    balance?: true
  }

  export type BankAccountMinAggregateInputType = {
    id?: true
    userId?: true
    country?: true
    currency?: true
    balance?: true
    createdAt?: true
  }

  export type BankAccountMaxAggregateInputType = {
    id?: true
    userId?: true
    country?: true
    currency?: true
    balance?: true
    createdAt?: true
  }

  export type BankAccountCountAggregateInputType = {
    id?: true
    userId?: true
    country?: true
    currency?: true
    balance?: true
    createdAt?: true
    _all?: true
  }

  export type BankAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankAccount to aggregate.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankAccounts
    **/
    _count?: true | BankAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BankAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BankAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankAccountMaxAggregateInputType
  }

  export type GetBankAccountAggregateType<T extends BankAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateBankAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankAccount[P]>
      : GetScalarType<T[P], AggregateBankAccount[P]>
  }




  export type BankAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankAccountWhereInput
    orderBy?: BankAccountOrderByWithAggregationInput | BankAccountOrderByWithAggregationInput[]
    by: BankAccountScalarFieldEnum[] | BankAccountScalarFieldEnum
    having?: BankAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankAccountCountAggregateInputType | true
    _avg?: BankAccountAvgAggregateInputType
    _sum?: BankAccountSumAggregateInputType
    _min?: BankAccountMinAggregateInputType
    _max?: BankAccountMaxAggregateInputType
  }

  export type BankAccountGroupByOutputType = {
    id: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance: Decimal
    createdAt: Date
    _count: BankAccountCountAggregateOutputType | null
    _avg: BankAccountAvgAggregateOutputType | null
    _sum: BankAccountSumAggregateOutputType | null
    _min: BankAccountMinAggregateOutputType | null
    _max: BankAccountMaxAggregateOutputType | null
  }

  type GetBankAccountGroupByPayload<T extends BankAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankAccountGroupByOutputType[P]>
            : GetScalarType<T[P], BankAccountGroupByOutputType[P]>
        }
      >
    >


  export type BankAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    country?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | BankAccount$logsArgs<ExtArgs>
    sentTransfers?: boolean | BankAccount$sentTransfersArgs<ExtArgs>
    receivedTransfers?: boolean | BankAccount$receivedTransfersArgs<ExtArgs>
    _count?: boolean | BankAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bankAccount"]>


  export type BankAccountSelectScalar = {
    id?: boolean
    userId?: boolean
    country?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
  }

  export type BankAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | BankAccount$logsArgs<ExtArgs>
    sentTransfers?: boolean | BankAccount$sentTransfersArgs<ExtArgs>
    receivedTransfers?: boolean | BankAccount$receivedTransfersArgs<ExtArgs>
    _count?: boolean | BankAccountCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BankAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      logs: Prisma.$AccountLogPayload<ExtArgs>[]
      sentTransfers: Prisma.$TransferTransactionPayload<ExtArgs>[]
      receivedTransfers: Prisma.$TransferTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      country: $Enums.Country
      currency: $Enums.Currency
      balance: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["bankAccount"]>
    composites: {}
  }

  type BankAccountGetPayload<S extends boolean | null | undefined | BankAccountDefaultArgs> = $Result.GetResult<Prisma.$BankAccountPayload, S>

  type BankAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BankAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BankAccountCountAggregateInputType | true
    }

  export interface BankAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankAccount'], meta: { name: 'BankAccount' } }
    /**
     * Find zero or one BankAccount that matches the filter.
     * @param {BankAccountFindUniqueArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankAccountFindUniqueArgs>(args: SelectSubset<T, BankAccountFindUniqueArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BankAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BankAccountFindUniqueOrThrowArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, BankAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BankAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindFirstArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankAccountFindFirstArgs>(args?: SelectSubset<T, BankAccountFindFirstArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BankAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindFirstOrThrowArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, BankAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BankAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankAccounts
     * const bankAccounts = await prisma.bankAccount.findMany()
     * 
     * // Get first 10 BankAccounts
     * const bankAccounts = await prisma.bankAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankAccountWithIdOnly = await prisma.bankAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankAccountFindManyArgs>(args?: SelectSubset<T, BankAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BankAccount.
     * @param {BankAccountCreateArgs} args - Arguments to create a BankAccount.
     * @example
     * // Create one BankAccount
     * const BankAccount = await prisma.bankAccount.create({
     *   data: {
     *     // ... data to create a BankAccount
     *   }
     * })
     * 
     */
    create<T extends BankAccountCreateArgs>(args: SelectSubset<T, BankAccountCreateArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BankAccounts.
     * @param {BankAccountCreateManyArgs} args - Arguments to create many BankAccounts.
     * @example
     * // Create many BankAccounts
     * const bankAccount = await prisma.bankAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankAccountCreateManyArgs>(args?: SelectSubset<T, BankAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BankAccount.
     * @param {BankAccountDeleteArgs} args - Arguments to delete one BankAccount.
     * @example
     * // Delete one BankAccount
     * const BankAccount = await prisma.bankAccount.delete({
     *   where: {
     *     // ... filter to delete one BankAccount
     *   }
     * })
     * 
     */
    delete<T extends BankAccountDeleteArgs>(args: SelectSubset<T, BankAccountDeleteArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BankAccount.
     * @param {BankAccountUpdateArgs} args - Arguments to update one BankAccount.
     * @example
     * // Update one BankAccount
     * const bankAccount = await prisma.bankAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankAccountUpdateArgs>(args: SelectSubset<T, BankAccountUpdateArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BankAccounts.
     * @param {BankAccountDeleteManyArgs} args - Arguments to filter BankAccounts to delete.
     * @example
     * // Delete a few BankAccounts
     * const { count } = await prisma.bankAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankAccountDeleteManyArgs>(args?: SelectSubset<T, BankAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankAccounts
     * const bankAccount = await prisma.bankAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankAccountUpdateManyArgs>(args: SelectSubset<T, BankAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BankAccount.
     * @param {BankAccountUpsertArgs} args - Arguments to update or create a BankAccount.
     * @example
     * // Update or create a BankAccount
     * const bankAccount = await prisma.bankAccount.upsert({
     *   create: {
     *     // ... data to create a BankAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankAccount we want to update
     *   }
     * })
     */
    upsert<T extends BankAccountUpsertArgs>(args: SelectSubset<T, BankAccountUpsertArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BankAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountCountArgs} args - Arguments to filter BankAccounts to count.
     * @example
     * // Count the number of BankAccounts
     * const count = await prisma.bankAccount.count({
     *   where: {
     *     // ... the filter for the BankAccounts we want to count
     *   }
     * })
    **/
    count<T extends BankAccountCountArgs>(
      args?: Subset<T, BankAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankAccountAggregateArgs>(args: Subset<T, BankAccountAggregateArgs>): Prisma.PrismaPromise<GetBankAccountAggregateType<T>>

    /**
     * Group by BankAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankAccountGroupByArgs['orderBy'] }
        : { orderBy?: BankAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankAccount model
   */
  readonly fields: BankAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends BankAccount$logsArgs<ExtArgs> = {}>(args?: Subset<T, BankAccount$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findMany"> | Null>
    sentTransfers<T extends BankAccount$sentTransfersArgs<ExtArgs> = {}>(args?: Subset<T, BankAccount$sentTransfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    receivedTransfers<T extends BankAccount$receivedTransfersArgs<ExtArgs> = {}>(args?: Subset<T, BankAccount$receivedTransfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankAccount model
   */ 
  interface BankAccountFieldRefs {
    readonly id: FieldRef<"BankAccount", 'String'>
    readonly userId: FieldRef<"BankAccount", 'String'>
    readonly country: FieldRef<"BankAccount", 'Country'>
    readonly currency: FieldRef<"BankAccount", 'Currency'>
    readonly balance: FieldRef<"BankAccount", 'Decimal'>
    readonly createdAt: FieldRef<"BankAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BankAccount findUnique
   */
  export type BankAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount findUniqueOrThrow
   */
  export type BankAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount findFirst
   */
  export type BankAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankAccounts.
     */
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount findFirstOrThrow
   */
  export type BankAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankAccounts.
     */
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount findMany
   */
  export type BankAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccounts to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount create
   */
  export type BankAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a BankAccount.
     */
    data: XOR<BankAccountCreateInput, BankAccountUncheckedCreateInput>
  }

  /**
   * BankAccount createMany
   */
  export type BankAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankAccounts.
     */
    data: BankAccountCreateManyInput | BankAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankAccount update
   */
  export type BankAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a BankAccount.
     */
    data: XOR<BankAccountUpdateInput, BankAccountUncheckedUpdateInput>
    /**
     * Choose, which BankAccount to update.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount updateMany
   */
  export type BankAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankAccounts.
     */
    data: XOR<BankAccountUpdateManyMutationInput, BankAccountUncheckedUpdateManyInput>
    /**
     * Filter which BankAccounts to update
     */
    where?: BankAccountWhereInput
  }

  /**
   * BankAccount upsert
   */
  export type BankAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the BankAccount to update in case it exists.
     */
    where: BankAccountWhereUniqueInput
    /**
     * In case the BankAccount found by the `where` argument doesn't exist, create a new BankAccount with this data.
     */
    create: XOR<BankAccountCreateInput, BankAccountUncheckedCreateInput>
    /**
     * In case the BankAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankAccountUpdateInput, BankAccountUncheckedUpdateInput>
  }

  /**
   * BankAccount delete
   */
  export type BankAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter which BankAccount to delete.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount deleteMany
   */
  export type BankAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankAccounts to delete
     */
    where?: BankAccountWhereInput
  }

  /**
   * BankAccount.logs
   */
  export type BankAccount$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    where?: AccountLogWhereInput
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    cursor?: AccountLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountLogScalarFieldEnum | AccountLogScalarFieldEnum[]
  }

  /**
   * BankAccount.sentTransfers
   */
  export type BankAccount$sentTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    where?: TransferTransactionWhereInput
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    cursor?: TransferTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferTransactionScalarFieldEnum | TransferTransactionScalarFieldEnum[]
  }

  /**
   * BankAccount.receivedTransfers
   */
  export type BankAccount$receivedTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    where?: TransferTransactionWhereInput
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    cursor?: TransferTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferTransactionScalarFieldEnum | TransferTransactionScalarFieldEnum[]
  }

  /**
   * BankAccount without action
   */
  export type BankAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
  }


  /**
   * Model TransferTransaction
   */

  export type AggregateTransferTransaction = {
    _count: TransferTransactionCountAggregateOutputType | null
    _avg: TransferTransactionAvgAggregateOutputType | null
    _sum: TransferTransactionSumAggregateOutputType | null
    _min: TransferTransactionMinAggregateOutputType | null
    _max: TransferTransactionMaxAggregateOutputType | null
  }

  export type TransferTransactionAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type TransferTransactionSumAggregateOutputType = {
    id: bigint | null
    amount: Decimal | null
  }

  export type TransferTransactionMinAggregateOutputType = {
    id: bigint | null
    fromAccountId: string | null
    toAccountId: string | null
    amount: Decimal | null
    createdAt: Date | null
  }

  export type TransferTransactionMaxAggregateOutputType = {
    id: bigint | null
    fromAccountId: string | null
    toAccountId: string | null
    amount: Decimal | null
    createdAt: Date | null
  }

  export type TransferTransactionCountAggregateOutputType = {
    id: number
    fromAccountId: number
    toAccountId: number
    amount: number
    createdAt: number
    _all: number
  }


  export type TransferTransactionAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type TransferTransactionSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type TransferTransactionMinAggregateInputType = {
    id?: true
    fromAccountId?: true
    toAccountId?: true
    amount?: true
    createdAt?: true
  }

  export type TransferTransactionMaxAggregateInputType = {
    id?: true
    fromAccountId?: true
    toAccountId?: true
    amount?: true
    createdAt?: true
  }

  export type TransferTransactionCountAggregateInputType = {
    id?: true
    fromAccountId?: true
    toAccountId?: true
    amount?: true
    createdAt?: true
    _all?: true
  }

  export type TransferTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransferTransaction to aggregate.
     */
    where?: TransferTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferTransactions to fetch.
     */
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransferTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransferTransactions
    **/
    _count?: true | TransferTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransferTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransferTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransferTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransferTransactionMaxAggregateInputType
  }

  export type GetTransferTransactionAggregateType<T extends TransferTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransferTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransferTransaction[P]>
      : GetScalarType<T[P], AggregateTransferTransaction[P]>
  }




  export type TransferTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferTransactionWhereInput
    orderBy?: TransferTransactionOrderByWithAggregationInput | TransferTransactionOrderByWithAggregationInput[]
    by: TransferTransactionScalarFieldEnum[] | TransferTransactionScalarFieldEnum
    having?: TransferTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransferTransactionCountAggregateInputType | true
    _avg?: TransferTransactionAvgAggregateInputType
    _sum?: TransferTransactionSumAggregateInputType
    _min?: TransferTransactionMinAggregateInputType
    _max?: TransferTransactionMaxAggregateInputType
  }

  export type TransferTransactionGroupByOutputType = {
    id: bigint
    fromAccountId: string
    toAccountId: string
    amount: Decimal
    createdAt: Date
    _count: TransferTransactionCountAggregateOutputType | null
    _avg: TransferTransactionAvgAggregateOutputType | null
    _sum: TransferTransactionSumAggregateOutputType | null
    _min: TransferTransactionMinAggregateOutputType | null
    _max: TransferTransactionMaxAggregateOutputType | null
  }

  type GetTransferTransactionGroupByPayload<T extends TransferTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransferTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransferTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransferTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransferTransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransferTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromAccountId?: boolean
    toAccountId?: boolean
    amount?: boolean
    createdAt?: boolean
    fromAccount?: boolean | BankAccountDefaultArgs<ExtArgs>
    toAccount?: boolean | BankAccountDefaultArgs<ExtArgs>
    logs?: boolean | TransferTransaction$logsArgs<ExtArgs>
    _count?: boolean | TransferTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transferTransaction"]>


  export type TransferTransactionSelectScalar = {
    id?: boolean
    fromAccountId?: boolean
    toAccountId?: boolean
    amount?: boolean
    createdAt?: boolean
  }

  export type TransferTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromAccount?: boolean | BankAccountDefaultArgs<ExtArgs>
    toAccount?: boolean | BankAccountDefaultArgs<ExtArgs>
    logs?: boolean | TransferTransaction$logsArgs<ExtArgs>
    _count?: boolean | TransferTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TransferTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransferTransaction"
    objects: {
      fromAccount: Prisma.$BankAccountPayload<ExtArgs>
      toAccount: Prisma.$BankAccountPayload<ExtArgs>
      logs: Prisma.$AccountLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      fromAccountId: string
      toAccountId: string
      amount: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["transferTransaction"]>
    composites: {}
  }

  type TransferTransactionGetPayload<S extends boolean | null | undefined | TransferTransactionDefaultArgs> = $Result.GetResult<Prisma.$TransferTransactionPayload, S>

  type TransferTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransferTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransferTransactionCountAggregateInputType | true
    }

  export interface TransferTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransferTransaction'], meta: { name: 'TransferTransaction' } }
    /**
     * Find zero or one TransferTransaction that matches the filter.
     * @param {TransferTransactionFindUniqueArgs} args - Arguments to find a TransferTransaction
     * @example
     * // Get one TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransferTransactionFindUniqueArgs>(args: SelectSubset<T, TransferTransactionFindUniqueArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TransferTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransferTransactionFindUniqueOrThrowArgs} args - Arguments to find a TransferTransaction
     * @example
     * // Get one TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransferTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransferTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TransferTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionFindFirstArgs} args - Arguments to find a TransferTransaction
     * @example
     * // Get one TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransferTransactionFindFirstArgs>(args?: SelectSubset<T, TransferTransactionFindFirstArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TransferTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionFindFirstOrThrowArgs} args - Arguments to find a TransferTransaction
     * @example
     * // Get one TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransferTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransferTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TransferTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransferTransactions
     * const transferTransactions = await prisma.transferTransaction.findMany()
     * 
     * // Get first 10 TransferTransactions
     * const transferTransactions = await prisma.transferTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transferTransactionWithIdOnly = await prisma.transferTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransferTransactionFindManyArgs>(args?: SelectSubset<T, TransferTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TransferTransaction.
     * @param {TransferTransactionCreateArgs} args - Arguments to create a TransferTransaction.
     * @example
     * // Create one TransferTransaction
     * const TransferTransaction = await prisma.transferTransaction.create({
     *   data: {
     *     // ... data to create a TransferTransaction
     *   }
     * })
     * 
     */
    create<T extends TransferTransactionCreateArgs>(args: SelectSubset<T, TransferTransactionCreateArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TransferTransactions.
     * @param {TransferTransactionCreateManyArgs} args - Arguments to create many TransferTransactions.
     * @example
     * // Create many TransferTransactions
     * const transferTransaction = await prisma.transferTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransferTransactionCreateManyArgs>(args?: SelectSubset<T, TransferTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TransferTransaction.
     * @param {TransferTransactionDeleteArgs} args - Arguments to delete one TransferTransaction.
     * @example
     * // Delete one TransferTransaction
     * const TransferTransaction = await prisma.transferTransaction.delete({
     *   where: {
     *     // ... filter to delete one TransferTransaction
     *   }
     * })
     * 
     */
    delete<T extends TransferTransactionDeleteArgs>(args: SelectSubset<T, TransferTransactionDeleteArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TransferTransaction.
     * @param {TransferTransactionUpdateArgs} args - Arguments to update one TransferTransaction.
     * @example
     * // Update one TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransferTransactionUpdateArgs>(args: SelectSubset<T, TransferTransactionUpdateArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TransferTransactions.
     * @param {TransferTransactionDeleteManyArgs} args - Arguments to filter TransferTransactions to delete.
     * @example
     * // Delete a few TransferTransactions
     * const { count } = await prisma.transferTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransferTransactionDeleteManyArgs>(args?: SelectSubset<T, TransferTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransferTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransferTransactions
     * const transferTransaction = await prisma.transferTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransferTransactionUpdateManyArgs>(args: SelectSubset<T, TransferTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TransferTransaction.
     * @param {TransferTransactionUpsertArgs} args - Arguments to update or create a TransferTransaction.
     * @example
     * // Update or create a TransferTransaction
     * const transferTransaction = await prisma.transferTransaction.upsert({
     *   create: {
     *     // ... data to create a TransferTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransferTransaction we want to update
     *   }
     * })
     */
    upsert<T extends TransferTransactionUpsertArgs>(args: SelectSubset<T, TransferTransactionUpsertArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TransferTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionCountArgs} args - Arguments to filter TransferTransactions to count.
     * @example
     * // Count the number of TransferTransactions
     * const count = await prisma.transferTransaction.count({
     *   where: {
     *     // ... the filter for the TransferTransactions we want to count
     *   }
     * })
    **/
    count<T extends TransferTransactionCountArgs>(
      args?: Subset<T, TransferTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransferTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransferTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransferTransactionAggregateArgs>(args: Subset<T, TransferTransactionAggregateArgs>): Prisma.PrismaPromise<GetTransferTransactionAggregateType<T>>

    /**
     * Group by TransferTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransferTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransferTransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransferTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransferTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransferTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransferTransaction model
   */
  readonly fields: TransferTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransferTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransferTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromAccount<T extends BankAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BankAccountDefaultArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    toAccount<T extends BankAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BankAccountDefaultArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends TransferTransaction$logsArgs<ExtArgs> = {}>(args?: Subset<T, TransferTransaction$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TransferTransaction model
   */ 
  interface TransferTransactionFieldRefs {
    readonly id: FieldRef<"TransferTransaction", 'BigInt'>
    readonly fromAccountId: FieldRef<"TransferTransaction", 'String'>
    readonly toAccountId: FieldRef<"TransferTransaction", 'String'>
    readonly amount: FieldRef<"TransferTransaction", 'Decimal'>
    readonly createdAt: FieldRef<"TransferTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TransferTransaction findUnique
   */
  export type TransferTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TransferTransaction to fetch.
     */
    where: TransferTransactionWhereUniqueInput
  }

  /**
   * TransferTransaction findUniqueOrThrow
   */
  export type TransferTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TransferTransaction to fetch.
     */
    where: TransferTransactionWhereUniqueInput
  }

  /**
   * TransferTransaction findFirst
   */
  export type TransferTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TransferTransaction to fetch.
     */
    where?: TransferTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferTransactions to fetch.
     */
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransferTransactions.
     */
    cursor?: TransferTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransferTransactions.
     */
    distinct?: TransferTransactionScalarFieldEnum | TransferTransactionScalarFieldEnum[]
  }

  /**
   * TransferTransaction findFirstOrThrow
   */
  export type TransferTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TransferTransaction to fetch.
     */
    where?: TransferTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferTransactions to fetch.
     */
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransferTransactions.
     */
    cursor?: TransferTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransferTransactions.
     */
    distinct?: TransferTransactionScalarFieldEnum | TransferTransactionScalarFieldEnum[]
  }

  /**
   * TransferTransaction findMany
   */
  export type TransferTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TransferTransactions to fetch.
     */
    where?: TransferTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferTransactions to fetch.
     */
    orderBy?: TransferTransactionOrderByWithRelationInput | TransferTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransferTransactions.
     */
    cursor?: TransferTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferTransactions.
     */
    skip?: number
    distinct?: TransferTransactionScalarFieldEnum | TransferTransactionScalarFieldEnum[]
  }

  /**
   * TransferTransaction create
   */
  export type TransferTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a TransferTransaction.
     */
    data: XOR<TransferTransactionCreateInput, TransferTransactionUncheckedCreateInput>
  }

  /**
   * TransferTransaction createMany
   */
  export type TransferTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransferTransactions.
     */
    data: TransferTransactionCreateManyInput | TransferTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransferTransaction update
   */
  export type TransferTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a TransferTransaction.
     */
    data: XOR<TransferTransactionUpdateInput, TransferTransactionUncheckedUpdateInput>
    /**
     * Choose, which TransferTransaction to update.
     */
    where: TransferTransactionWhereUniqueInput
  }

  /**
   * TransferTransaction updateMany
   */
  export type TransferTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransferTransactions.
     */
    data: XOR<TransferTransactionUpdateManyMutationInput, TransferTransactionUncheckedUpdateManyInput>
    /**
     * Filter which TransferTransactions to update
     */
    where?: TransferTransactionWhereInput
  }

  /**
   * TransferTransaction upsert
   */
  export type TransferTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the TransferTransaction to update in case it exists.
     */
    where: TransferTransactionWhereUniqueInput
    /**
     * In case the TransferTransaction found by the `where` argument doesn't exist, create a new TransferTransaction with this data.
     */
    create: XOR<TransferTransactionCreateInput, TransferTransactionUncheckedCreateInput>
    /**
     * In case the TransferTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransferTransactionUpdateInput, TransferTransactionUncheckedUpdateInput>
  }

  /**
   * TransferTransaction delete
   */
  export type TransferTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    /**
     * Filter which TransferTransaction to delete.
     */
    where: TransferTransactionWhereUniqueInput
  }

  /**
   * TransferTransaction deleteMany
   */
  export type TransferTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransferTransactions to delete
     */
    where?: TransferTransactionWhereInput
  }

  /**
   * TransferTransaction.logs
   */
  export type TransferTransaction$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    where?: AccountLogWhereInput
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    cursor?: AccountLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountLogScalarFieldEnum | AccountLogScalarFieldEnum[]
  }

  /**
   * TransferTransaction without action
   */
  export type TransferTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
  }


  /**
   * Model AccountLog
   */

  export type AggregateAccountLog = {
    _count: AccountLogCountAggregateOutputType | null
    _avg: AccountLogAvgAggregateOutputType | null
    _sum: AccountLogSumAggregateOutputType | null
    _min: AccountLogMinAggregateOutputType | null
    _max: AccountLogMaxAggregateOutputType | null
  }

  export type AccountLogAvgAggregateOutputType = {
    id: number | null
    transferId: number | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
  }

  export type AccountLogSumAggregateOutputType = {
    id: bigint | null
    transferId: bigint | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
  }

  export type AccountLogMinAggregateOutputType = {
    id: bigint | null
    accountId: string | null
    transferId: bigint | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
    createdAt: Date | null
  }

  export type AccountLogMaxAggregateOutputType = {
    id: bigint | null
    accountId: string | null
    transferId: bigint | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
    createdAt: Date | null
  }

  export type AccountLogCountAggregateOutputType = {
    id: number
    accountId: number
    transferId: number
    type: number
    amount: number
    balanceBefore: number
    balanceAfter: number
    createdAt: number
    _all: number
  }


  export type AccountLogAvgAggregateInputType = {
    id?: true
    transferId?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type AccountLogSumAggregateInputType = {
    id?: true
    transferId?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type AccountLogMinAggregateInputType = {
    id?: true
    accountId?: true
    transferId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type AccountLogMaxAggregateInputType = {
    id?: true
    accountId?: true
    transferId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type AccountLogCountAggregateInputType = {
    id?: true
    accountId?: true
    transferId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    createdAt?: true
    _all?: true
  }

  export type AccountLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountLog to aggregate.
     */
    where?: AccountLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountLogs to fetch.
     */
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountLogs
    **/
    _count?: true | AccountLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountLogMaxAggregateInputType
  }

  export type GetAccountLogAggregateType<T extends AccountLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountLog[P]>
      : GetScalarType<T[P], AggregateAccountLog[P]>
  }




  export type AccountLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountLogWhereInput
    orderBy?: AccountLogOrderByWithAggregationInput | AccountLogOrderByWithAggregationInput[]
    by: AccountLogScalarFieldEnum[] | AccountLogScalarFieldEnum
    having?: AccountLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountLogCountAggregateInputType | true
    _avg?: AccountLogAvgAggregateInputType
    _sum?: AccountLogSumAggregateInputType
    _min?: AccountLogMinAggregateInputType
    _max?: AccountLogMaxAggregateInputType
  }

  export type AccountLogGroupByOutputType = {
    id: bigint
    accountId: string
    transferId: bigint | null
    type: $Enums.TransactionType
    amount: Decimal
    balanceBefore: Decimal
    balanceAfter: Decimal
    createdAt: Date
    _count: AccountLogCountAggregateOutputType | null
    _avg: AccountLogAvgAggregateOutputType | null
    _sum: AccountLogSumAggregateOutputType | null
    _min: AccountLogMinAggregateOutputType | null
    _max: AccountLogMaxAggregateOutputType | null
  }

  type GetAccountLogGroupByPayload<T extends AccountLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountLogGroupByOutputType[P]>
            : GetScalarType<T[P], AccountLogGroupByOutputType[P]>
        }
      >
    >


  export type AccountLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    transferId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
    account?: boolean | BankAccountDefaultArgs<ExtArgs>
    transfer?: boolean | AccountLog$transferArgs<ExtArgs>
  }, ExtArgs["result"]["accountLog"]>


  export type AccountLogSelectScalar = {
    id?: boolean
    accountId?: boolean
    transferId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
  }

  export type AccountLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | BankAccountDefaultArgs<ExtArgs>
    transfer?: boolean | AccountLog$transferArgs<ExtArgs>
  }

  export type $AccountLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccountLog"
    objects: {
      account: Prisma.$BankAccountPayload<ExtArgs>
      transfer: Prisma.$TransferTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      accountId: string
      transferId: bigint | null
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      balanceBefore: Prisma.Decimal
      balanceAfter: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["accountLog"]>
    composites: {}
  }

  type AccountLogGetPayload<S extends boolean | null | undefined | AccountLogDefaultArgs> = $Result.GetResult<Prisma.$AccountLogPayload, S>

  type AccountLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountLogCountAggregateInputType | true
    }

  export interface AccountLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccountLog'], meta: { name: 'AccountLog' } }
    /**
     * Find zero or one AccountLog that matches the filter.
     * @param {AccountLogFindUniqueArgs} args - Arguments to find a AccountLog
     * @example
     * // Get one AccountLog
     * const accountLog = await prisma.accountLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountLogFindUniqueArgs>(args: SelectSubset<T, AccountLogFindUniqueArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AccountLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountLogFindUniqueOrThrowArgs} args - Arguments to find a AccountLog
     * @example
     * // Get one AccountLog
     * const accountLog = await prisma.accountLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AccountLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogFindFirstArgs} args - Arguments to find a AccountLog
     * @example
     * // Get one AccountLog
     * const accountLog = await prisma.accountLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountLogFindFirstArgs>(args?: SelectSubset<T, AccountLogFindFirstArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AccountLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogFindFirstOrThrowArgs} args - Arguments to find a AccountLog
     * @example
     * // Get one AccountLog
     * const accountLog = await prisma.accountLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AccountLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountLogs
     * const accountLogs = await prisma.accountLog.findMany()
     * 
     * // Get first 10 AccountLogs
     * const accountLogs = await prisma.accountLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountLogWithIdOnly = await prisma.accountLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountLogFindManyArgs>(args?: SelectSubset<T, AccountLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AccountLog.
     * @param {AccountLogCreateArgs} args - Arguments to create a AccountLog.
     * @example
     * // Create one AccountLog
     * const AccountLog = await prisma.accountLog.create({
     *   data: {
     *     // ... data to create a AccountLog
     *   }
     * })
     * 
     */
    create<T extends AccountLogCreateArgs>(args: SelectSubset<T, AccountLogCreateArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AccountLogs.
     * @param {AccountLogCreateManyArgs} args - Arguments to create many AccountLogs.
     * @example
     * // Create many AccountLogs
     * const accountLog = await prisma.accountLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountLogCreateManyArgs>(args?: SelectSubset<T, AccountLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AccountLog.
     * @param {AccountLogDeleteArgs} args - Arguments to delete one AccountLog.
     * @example
     * // Delete one AccountLog
     * const AccountLog = await prisma.accountLog.delete({
     *   where: {
     *     // ... filter to delete one AccountLog
     *   }
     * })
     * 
     */
    delete<T extends AccountLogDeleteArgs>(args: SelectSubset<T, AccountLogDeleteArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AccountLog.
     * @param {AccountLogUpdateArgs} args - Arguments to update one AccountLog.
     * @example
     * // Update one AccountLog
     * const accountLog = await prisma.accountLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountLogUpdateArgs>(args: SelectSubset<T, AccountLogUpdateArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AccountLogs.
     * @param {AccountLogDeleteManyArgs} args - Arguments to filter AccountLogs to delete.
     * @example
     * // Delete a few AccountLogs
     * const { count } = await prisma.accountLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountLogDeleteManyArgs>(args?: SelectSubset<T, AccountLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountLogs
     * const accountLog = await prisma.accountLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountLogUpdateManyArgs>(args: SelectSubset<T, AccountLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountLog.
     * @param {AccountLogUpsertArgs} args - Arguments to update or create a AccountLog.
     * @example
     * // Update or create a AccountLog
     * const accountLog = await prisma.accountLog.upsert({
     *   create: {
     *     // ... data to create a AccountLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountLog we want to update
     *   }
     * })
     */
    upsert<T extends AccountLogUpsertArgs>(args: SelectSubset<T, AccountLogUpsertArgs<ExtArgs>>): Prisma__AccountLogClient<$Result.GetResult<Prisma.$AccountLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AccountLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogCountArgs} args - Arguments to filter AccountLogs to count.
     * @example
     * // Count the number of AccountLogs
     * const count = await prisma.accountLog.count({
     *   where: {
     *     // ... the filter for the AccountLogs we want to count
     *   }
     * })
    **/
    count<T extends AccountLogCountArgs>(
      args?: Subset<T, AccountLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountLogAggregateArgs>(args: Subset<T, AccountLogAggregateArgs>): Prisma.PrismaPromise<GetAccountLogAggregateType<T>>

    /**
     * Group by AccountLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountLogGroupByArgs['orderBy'] }
        : { orderBy?: AccountLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccountLog model
   */
  readonly fields: AccountLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends BankAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BankAccountDefaultArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    transfer<T extends AccountLog$transferArgs<ExtArgs> = {}>(args?: Subset<T, AccountLog$transferArgs<ExtArgs>>): Prisma__TransferTransactionClient<$Result.GetResult<Prisma.$TransferTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccountLog model
   */ 
  interface AccountLogFieldRefs {
    readonly id: FieldRef<"AccountLog", 'BigInt'>
    readonly accountId: FieldRef<"AccountLog", 'String'>
    readonly transferId: FieldRef<"AccountLog", 'BigInt'>
    readonly type: FieldRef<"AccountLog", 'TransactionType'>
    readonly amount: FieldRef<"AccountLog", 'Decimal'>
    readonly balanceBefore: FieldRef<"AccountLog", 'Decimal'>
    readonly balanceAfter: FieldRef<"AccountLog", 'Decimal'>
    readonly createdAt: FieldRef<"AccountLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccountLog findUnique
   */
  export type AccountLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountLog to fetch.
     */
    where: AccountLogWhereUniqueInput
  }

  /**
   * AccountLog findUniqueOrThrow
   */
  export type AccountLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountLog to fetch.
     */
    where: AccountLogWhereUniqueInput
  }

  /**
   * AccountLog findFirst
   */
  export type AccountLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountLog to fetch.
     */
    where?: AccountLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountLogs to fetch.
     */
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountLogs.
     */
    cursor?: AccountLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountLogs.
     */
    distinct?: AccountLogScalarFieldEnum | AccountLogScalarFieldEnum[]
  }

  /**
   * AccountLog findFirstOrThrow
   */
  export type AccountLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountLog to fetch.
     */
    where?: AccountLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountLogs to fetch.
     */
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountLogs.
     */
    cursor?: AccountLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountLogs.
     */
    distinct?: AccountLogScalarFieldEnum | AccountLogScalarFieldEnum[]
  }

  /**
   * AccountLog findMany
   */
  export type AccountLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountLogs to fetch.
     */
    where?: AccountLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountLogs to fetch.
     */
    orderBy?: AccountLogOrderByWithRelationInput | AccountLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountLogs.
     */
    cursor?: AccountLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountLogs.
     */
    skip?: number
    distinct?: AccountLogScalarFieldEnum | AccountLogScalarFieldEnum[]
  }

  /**
   * AccountLog create
   */
  export type AccountLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AccountLog.
     */
    data: XOR<AccountLogCreateInput, AccountLogUncheckedCreateInput>
  }

  /**
   * AccountLog createMany
   */
  export type AccountLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountLogs.
     */
    data: AccountLogCreateManyInput | AccountLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountLog update
   */
  export type AccountLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AccountLog.
     */
    data: XOR<AccountLogUpdateInput, AccountLogUncheckedUpdateInput>
    /**
     * Choose, which AccountLog to update.
     */
    where: AccountLogWhereUniqueInput
  }

  /**
   * AccountLog updateMany
   */
  export type AccountLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountLogs.
     */
    data: XOR<AccountLogUpdateManyMutationInput, AccountLogUncheckedUpdateManyInput>
    /**
     * Filter which AccountLogs to update
     */
    where?: AccountLogWhereInput
  }

  /**
   * AccountLog upsert
   */
  export type AccountLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AccountLog to update in case it exists.
     */
    where: AccountLogWhereUniqueInput
    /**
     * In case the AccountLog found by the `where` argument doesn't exist, create a new AccountLog with this data.
     */
    create: XOR<AccountLogCreateInput, AccountLogUncheckedCreateInput>
    /**
     * In case the AccountLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountLogUpdateInput, AccountLogUncheckedUpdateInput>
  }

  /**
   * AccountLog delete
   */
  export type AccountLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
    /**
     * Filter which AccountLog to delete.
     */
    where: AccountLogWhereUniqueInput
  }

  /**
   * AccountLog deleteMany
   */
  export type AccountLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountLogs to delete
     */
    where?: AccountLogWhereInput
  }

  /**
   * AccountLog.transfer
   */
  export type AccountLog$transferArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferTransaction
     */
    select?: TransferTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferTransactionInclude<ExtArgs> | null
    where?: TransferTransactionWhereInput
  }

  /**
   * AccountLog without action
   */
  export type AccountLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountLog
     */
    select?: AccountLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountLogInclude<ExtArgs> | null
  }


  /**
   * Model Holding
   */

  export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  export type HoldingAvgAggregateOutputType = {
    quantity: Decimal | null
    avgCost: Decimal | null
  }

  export type HoldingSumAggregateOutputType = {
    quantity: Decimal | null
    avgCost: Decimal | null
  }

  export type HoldingMinAggregateOutputType = {
    userId: string | null
    stockId: string | null
    quantity: Decimal | null
    avgCost: Decimal | null
  }

  export type HoldingMaxAggregateOutputType = {
    userId: string | null
    stockId: string | null
    quantity: Decimal | null
    avgCost: Decimal | null
  }

  export type HoldingCountAggregateOutputType = {
    userId: number
    stockId: number
    quantity: number
    avgCost: number
    _all: number
  }


  export type HoldingAvgAggregateInputType = {
    quantity?: true
    avgCost?: true
  }

  export type HoldingSumAggregateInputType = {
    quantity?: true
    avgCost?: true
  }

  export type HoldingMinAggregateInputType = {
    userId?: true
    stockId?: true
    quantity?: true
    avgCost?: true
  }

  export type HoldingMaxAggregateInputType = {
    userId?: true
    stockId?: true
    quantity?: true
    avgCost?: true
  }

  export type HoldingCountAggregateInputType = {
    userId?: true
    stockId?: true
    quantity?: true
    avgCost?: true
    _all?: true
  }

  export type HoldingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holdings
    **/
    _count?: true | HoldingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType
  }

  export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
        [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolding[P]>
      : GetScalarType<T[P], AggregateHolding[P]>
  }




  export type HoldingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithAggregationInput | HoldingOrderByWithAggregationInput[]
    by: HoldingScalarFieldEnum[] | HoldingScalarFieldEnum
    having?: HoldingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingCountAggregateInputType | true
    _avg?: HoldingAvgAggregateInputType
    _sum?: HoldingSumAggregateInputType
    _min?: HoldingMinAggregateInputType
    _max?: HoldingMaxAggregateInputType
  }

  export type HoldingGroupByOutputType = {
    userId: string
    stockId: string
    quantity: Decimal
    avgCost: Decimal
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingGroupByOutputType[P]>
        }
      >
    >


  export type HoldingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    stockId?: boolean
    quantity?: boolean
    avgCost?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>


  export type HoldingSelectScalar = {
    userId?: boolean
    stockId?: boolean
    quantity?: boolean
    avgCost?: boolean
  }

  export type HoldingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HoldingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      stockId: string
      quantity: Prisma.Decimal
      avgCost: Prisma.Decimal
    }, ExtArgs["result"]["holding"]>
    composites: {}
  }

  type HoldingGetPayload<S extends boolean | null | undefined | HoldingDefaultArgs> = $Result.GetResult<Prisma.$HoldingPayload, S>

  type HoldingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HoldingCountAggregateInputType | true
    }

  export interface HoldingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holding'], meta: { name: 'Holding' } }
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(args: SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(args?: SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     * 
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const holdingWithUserIdOnly = await prisma.holding.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends HoldingFindManyArgs>(args?: SelectSubset<T, HoldingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     * 
     */
    create<T extends HoldingCreateArgs>(args: SelectSubset<T, HoldingCreateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingCreateManyArgs>(args?: SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     * 
     */
    delete<T extends HoldingDeleteArgs>(args: SelectSubset<T, HoldingDeleteArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingUpdateArgs>(args: SelectSubset<T, HoldingUpdateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingDeleteManyArgs>(args?: SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingUpdateManyArgs>(args: SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(args: SelectSubset<T, HoldingUpsertArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingCountArgs>(
      args?: Subset<T, HoldingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoldingAggregateArgs>(args: Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>

    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoldingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingGroupByArgs['orderBy'] }
        : { orderBy?: HoldingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holding model
   */
  readonly fields: HoldingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Holding model
   */ 
  interface HoldingFieldRefs {
    readonly userId: FieldRef<"Holding", 'String'>
    readonly stockId: FieldRef<"Holding", 'String'>
    readonly quantity: FieldRef<"Holding", 'Decimal'>
    readonly avgCost: FieldRef<"Holding", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * Holding findUnique
   */
  export type HoldingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findUniqueOrThrow
   */
  export type HoldingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findFirst
   */
  export type HoldingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findFirstOrThrow
   */
  export type HoldingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findMany
   */
  export type HoldingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding create
   */
  export type HoldingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to create a Holding.
     */
    data: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
  }

  /**
   * Holding createMany
   */
  export type HoldingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holding update
   */
  export type HoldingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to update a Holding.
     */
    data: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
    /**
     * Choose, which Holding to update.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding updateMany
   */
  export type HoldingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
  }

  /**
   * Holding upsert
   */
  export type HoldingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: HoldingWhereUniqueInput
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
  }

  /**
   * Holding delete
   */
  export type HoldingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter which Holding to delete.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding deleteMany
   */
  export type HoldingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingWhereInput
  }

  /**
   * Holding without action
   */
  export type HoldingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
  }


  /**
   * Model TransactionStock
   */

  export type AggregateTransactionStock = {
    _count: TransactionStockCountAggregateOutputType | null
    _avg: TransactionStockAvgAggregateOutputType | null
    _sum: TransactionStockSumAggregateOutputType | null
    _min: TransactionStockMinAggregateOutputType | null
    _max: TransactionStockMaxAggregateOutputType | null
  }

  export type TransactionStockAvgAggregateOutputType = {
    id: number | null
    quantity: Decimal | null
    price: Decimal | null
  }

  export type TransactionStockSumAggregateOutputType = {
    id: bigint | null
    quantity: Decimal | null
    price: Decimal | null
  }

  export type TransactionStockMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    stockId: string | null
    type: $Enums.TradeType | null
    quantity: Decimal | null
    price: Decimal | null
    tradeDate: Date | null
  }

  export type TransactionStockMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    stockId: string | null
    type: $Enums.TradeType | null
    quantity: Decimal | null
    price: Decimal | null
    tradeDate: Date | null
  }

  export type TransactionStockCountAggregateOutputType = {
    id: number
    userId: number
    stockId: number
    type: number
    quantity: number
    price: number
    tradeDate: number
    _all: number
  }


  export type TransactionStockAvgAggregateInputType = {
    id?: true
    quantity?: true
    price?: true
  }

  export type TransactionStockSumAggregateInputType = {
    id?: true
    quantity?: true
    price?: true
  }

  export type TransactionStockMinAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
    type?: true
    quantity?: true
    price?: true
    tradeDate?: true
  }

  export type TransactionStockMaxAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
    type?: true
    quantity?: true
    price?: true
    tradeDate?: true
  }

  export type TransactionStockCountAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
    type?: true
    quantity?: true
    price?: true
    tradeDate?: true
    _all?: true
  }

  export type TransactionStockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionStock to aggregate.
     */
    where?: TransactionStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionStocks to fetch.
     */
    orderBy?: TransactionStockOrderByWithRelationInput | TransactionStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionStocks
    **/
    _count?: true | TransactionStockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionStockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionStockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionStockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionStockMaxAggregateInputType
  }

  export type GetTransactionStockAggregateType<T extends TransactionStockAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactionStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionStock[P]>
      : GetScalarType<T[P], AggregateTransactionStock[P]>
  }




  export type TransactionStockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionStockWhereInput
    orderBy?: TransactionStockOrderByWithAggregationInput | TransactionStockOrderByWithAggregationInput[]
    by: TransactionStockScalarFieldEnum[] | TransactionStockScalarFieldEnum
    having?: TransactionStockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionStockCountAggregateInputType | true
    _avg?: TransactionStockAvgAggregateInputType
    _sum?: TransactionStockSumAggregateInputType
    _min?: TransactionStockMinAggregateInputType
    _max?: TransactionStockMaxAggregateInputType
  }

  export type TransactionStockGroupByOutputType = {
    id: bigint
    userId: string
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal
    price: Decimal
    tradeDate: Date
    _count: TransactionStockCountAggregateOutputType | null
    _avg: TransactionStockAvgAggregateOutputType | null
    _sum: TransactionStockSumAggregateOutputType | null
    _min: TransactionStockMinAggregateOutputType | null
    _max: TransactionStockMaxAggregateOutputType | null
  }

  type GetTransactionStockGroupByPayload<T extends TransactionStockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionStockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionStockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionStockGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionStockGroupByOutputType[P]>
        }
      >
    >


  export type TransactionStockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stockId?: boolean
    type?: boolean
    quantity?: boolean
    price?: boolean
    tradeDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionStock"]>


  export type TransactionStockSelectScalar = {
    id?: boolean
    userId?: boolean
    stockId?: boolean
    type?: boolean
    quantity?: boolean
    price?: boolean
    tradeDate?: boolean
  }

  export type TransactionStockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionStockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransactionStock"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      stockId: string
      type: $Enums.TradeType
      quantity: Prisma.Decimal
      price: Prisma.Decimal
      tradeDate: Date
    }, ExtArgs["result"]["transactionStock"]>
    composites: {}
  }

  type TransactionStockGetPayload<S extends boolean | null | undefined | TransactionStockDefaultArgs> = $Result.GetResult<Prisma.$TransactionStockPayload, S>

  type TransactionStockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionStockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionStockCountAggregateInputType | true
    }

  export interface TransactionStockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransactionStock'], meta: { name: 'TransactionStock' } }
    /**
     * Find zero or one TransactionStock that matches the filter.
     * @param {TransactionStockFindUniqueArgs} args - Arguments to find a TransactionStock
     * @example
     * // Get one TransactionStock
     * const transactionStock = await prisma.transactionStock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionStockFindUniqueArgs>(args: SelectSubset<T, TransactionStockFindUniqueArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TransactionStock that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransactionStockFindUniqueOrThrowArgs} args - Arguments to find a TransactionStock
     * @example
     * // Get one TransactionStock
     * const transactionStock = await prisma.transactionStock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionStockFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionStockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TransactionStock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockFindFirstArgs} args - Arguments to find a TransactionStock
     * @example
     * // Get one TransactionStock
     * const transactionStock = await prisma.transactionStock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionStockFindFirstArgs>(args?: SelectSubset<T, TransactionStockFindFirstArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TransactionStock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockFindFirstOrThrowArgs} args - Arguments to find a TransactionStock
     * @example
     * // Get one TransactionStock
     * const transactionStock = await prisma.transactionStock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionStockFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionStockFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TransactionStocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionStocks
     * const transactionStocks = await prisma.transactionStock.findMany()
     * 
     * // Get first 10 TransactionStocks
     * const transactionStocks = await prisma.transactionStock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionStockWithIdOnly = await prisma.transactionStock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionStockFindManyArgs>(args?: SelectSubset<T, TransactionStockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TransactionStock.
     * @param {TransactionStockCreateArgs} args - Arguments to create a TransactionStock.
     * @example
     * // Create one TransactionStock
     * const TransactionStock = await prisma.transactionStock.create({
     *   data: {
     *     // ... data to create a TransactionStock
     *   }
     * })
     * 
     */
    create<T extends TransactionStockCreateArgs>(args: SelectSubset<T, TransactionStockCreateArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TransactionStocks.
     * @param {TransactionStockCreateManyArgs} args - Arguments to create many TransactionStocks.
     * @example
     * // Create many TransactionStocks
     * const transactionStock = await prisma.transactionStock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionStockCreateManyArgs>(args?: SelectSubset<T, TransactionStockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TransactionStock.
     * @param {TransactionStockDeleteArgs} args - Arguments to delete one TransactionStock.
     * @example
     * // Delete one TransactionStock
     * const TransactionStock = await prisma.transactionStock.delete({
     *   where: {
     *     // ... filter to delete one TransactionStock
     *   }
     * })
     * 
     */
    delete<T extends TransactionStockDeleteArgs>(args: SelectSubset<T, TransactionStockDeleteArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TransactionStock.
     * @param {TransactionStockUpdateArgs} args - Arguments to update one TransactionStock.
     * @example
     * // Update one TransactionStock
     * const transactionStock = await prisma.transactionStock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionStockUpdateArgs>(args: SelectSubset<T, TransactionStockUpdateArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TransactionStocks.
     * @param {TransactionStockDeleteManyArgs} args - Arguments to filter TransactionStocks to delete.
     * @example
     * // Delete a few TransactionStocks
     * const { count } = await prisma.transactionStock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionStockDeleteManyArgs>(args?: SelectSubset<T, TransactionStockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionStocks
     * const transactionStock = await prisma.transactionStock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionStockUpdateManyArgs>(args: SelectSubset<T, TransactionStockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TransactionStock.
     * @param {TransactionStockUpsertArgs} args - Arguments to update or create a TransactionStock.
     * @example
     * // Update or create a TransactionStock
     * const transactionStock = await prisma.transactionStock.upsert({
     *   create: {
     *     // ... data to create a TransactionStock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionStock we want to update
     *   }
     * })
     */
    upsert<T extends TransactionStockUpsertArgs>(args: SelectSubset<T, TransactionStockUpsertArgs<ExtArgs>>): Prisma__TransactionStockClient<$Result.GetResult<Prisma.$TransactionStockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TransactionStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockCountArgs} args - Arguments to filter TransactionStocks to count.
     * @example
     * // Count the number of TransactionStocks
     * const count = await prisma.transactionStock.count({
     *   where: {
     *     // ... the filter for the TransactionStocks we want to count
     *   }
     * })
    **/
    count<T extends TransactionStockCountArgs>(
      args?: Subset<T, TransactionStockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionStockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionStockAggregateArgs>(args: Subset<T, TransactionStockAggregateArgs>): Prisma.PrismaPromise<GetTransactionStockAggregateType<T>>

    /**
     * Group by TransactionStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionStockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionStockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionStockGroupByArgs['orderBy'] }
        : { orderBy?: TransactionStockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionStockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransactionStock model
   */
  readonly fields: TransactionStockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionStock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionStockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TransactionStock model
   */ 
  interface TransactionStockFieldRefs {
    readonly id: FieldRef<"TransactionStock", 'BigInt'>
    readonly userId: FieldRef<"TransactionStock", 'String'>
    readonly stockId: FieldRef<"TransactionStock", 'String'>
    readonly type: FieldRef<"TransactionStock", 'TradeType'>
    readonly quantity: FieldRef<"TransactionStock", 'Decimal'>
    readonly price: FieldRef<"TransactionStock", 'Decimal'>
    readonly tradeDate: FieldRef<"TransactionStock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TransactionStock findUnique
   */
  export type TransactionStockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter, which TransactionStock to fetch.
     */
    where: TransactionStockWhereUniqueInput
  }

  /**
   * TransactionStock findUniqueOrThrow
   */
  export type TransactionStockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter, which TransactionStock to fetch.
     */
    where: TransactionStockWhereUniqueInput
  }

  /**
   * TransactionStock findFirst
   */
  export type TransactionStockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter, which TransactionStock to fetch.
     */
    where?: TransactionStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionStocks to fetch.
     */
    orderBy?: TransactionStockOrderByWithRelationInput | TransactionStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionStocks.
     */
    cursor?: TransactionStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionStocks.
     */
    distinct?: TransactionStockScalarFieldEnum | TransactionStockScalarFieldEnum[]
  }

  /**
   * TransactionStock findFirstOrThrow
   */
  export type TransactionStockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter, which TransactionStock to fetch.
     */
    where?: TransactionStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionStocks to fetch.
     */
    orderBy?: TransactionStockOrderByWithRelationInput | TransactionStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionStocks.
     */
    cursor?: TransactionStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionStocks.
     */
    distinct?: TransactionStockScalarFieldEnum | TransactionStockScalarFieldEnum[]
  }

  /**
   * TransactionStock findMany
   */
  export type TransactionStockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter, which TransactionStocks to fetch.
     */
    where?: TransactionStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionStocks to fetch.
     */
    orderBy?: TransactionStockOrderByWithRelationInput | TransactionStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionStocks.
     */
    cursor?: TransactionStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionStocks.
     */
    skip?: number
    distinct?: TransactionStockScalarFieldEnum | TransactionStockScalarFieldEnum[]
  }

  /**
   * TransactionStock create
   */
  export type TransactionStockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * The data needed to create a TransactionStock.
     */
    data: XOR<TransactionStockCreateInput, TransactionStockUncheckedCreateInput>
  }

  /**
   * TransactionStock createMany
   */
  export type TransactionStockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransactionStocks.
     */
    data: TransactionStockCreateManyInput | TransactionStockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransactionStock update
   */
  export type TransactionStockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * The data needed to update a TransactionStock.
     */
    data: XOR<TransactionStockUpdateInput, TransactionStockUncheckedUpdateInput>
    /**
     * Choose, which TransactionStock to update.
     */
    where: TransactionStockWhereUniqueInput
  }

  /**
   * TransactionStock updateMany
   */
  export type TransactionStockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransactionStocks.
     */
    data: XOR<TransactionStockUpdateManyMutationInput, TransactionStockUncheckedUpdateManyInput>
    /**
     * Filter which TransactionStocks to update
     */
    where?: TransactionStockWhereInput
  }

  /**
   * TransactionStock upsert
   */
  export type TransactionStockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * The filter to search for the TransactionStock to update in case it exists.
     */
    where: TransactionStockWhereUniqueInput
    /**
     * In case the TransactionStock found by the `where` argument doesn't exist, create a new TransactionStock with this data.
     */
    create: XOR<TransactionStockCreateInput, TransactionStockUncheckedCreateInput>
    /**
     * In case the TransactionStock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionStockUpdateInput, TransactionStockUncheckedUpdateInput>
  }

  /**
   * TransactionStock delete
   */
  export type TransactionStockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
    /**
     * Filter which TransactionStock to delete.
     */
    where: TransactionStockWhereUniqueInput
  }

  /**
   * TransactionStock deleteMany
   */
  export type TransactionStockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionStocks to delete
     */
    where?: TransactionStockWhereInput
  }

  /**
   * TransactionStock without action
   */
  export type TransactionStockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionStock
     */
    select?: TransactionStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionStockInclude<ExtArgs> | null
  }


  /**
   * Model PinnedStock
   */

  export type AggregatePinnedStock = {
    _count: PinnedStockCountAggregateOutputType | null
    _avg: PinnedStockAvgAggregateOutputType | null
    _sum: PinnedStockSumAggregateOutputType | null
    _min: PinnedStockMinAggregateOutputType | null
    _max: PinnedStockMaxAggregateOutputType | null
  }

  export type PinnedStockAvgAggregateOutputType = {
    id: number | null
  }

  export type PinnedStockSumAggregateOutputType = {
    id: bigint | null
  }

  export type PinnedStockMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    stockId: string | null
  }

  export type PinnedStockMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    stockId: string | null
  }

  export type PinnedStockCountAggregateOutputType = {
    id: number
    userId: number
    stockId: number
    _all: number
  }


  export type PinnedStockAvgAggregateInputType = {
    id?: true
  }

  export type PinnedStockSumAggregateInputType = {
    id?: true
  }

  export type PinnedStockMinAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
  }

  export type PinnedStockMaxAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
  }

  export type PinnedStockCountAggregateInputType = {
    id?: true
    userId?: true
    stockId?: true
    _all?: true
  }

  export type PinnedStockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PinnedStock to aggregate.
     */
    where?: PinnedStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PinnedStocks to fetch.
     */
    orderBy?: PinnedStockOrderByWithRelationInput | PinnedStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PinnedStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PinnedStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PinnedStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PinnedStocks
    **/
    _count?: true | PinnedStockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PinnedStockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PinnedStockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PinnedStockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PinnedStockMaxAggregateInputType
  }

  export type GetPinnedStockAggregateType<T extends PinnedStockAggregateArgs> = {
        [P in keyof T & keyof AggregatePinnedStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePinnedStock[P]>
      : GetScalarType<T[P], AggregatePinnedStock[P]>
  }




  export type PinnedStockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PinnedStockWhereInput
    orderBy?: PinnedStockOrderByWithAggregationInput | PinnedStockOrderByWithAggregationInput[]
    by: PinnedStockScalarFieldEnum[] | PinnedStockScalarFieldEnum
    having?: PinnedStockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PinnedStockCountAggregateInputType | true
    _avg?: PinnedStockAvgAggregateInputType
    _sum?: PinnedStockSumAggregateInputType
    _min?: PinnedStockMinAggregateInputType
    _max?: PinnedStockMaxAggregateInputType
  }

  export type PinnedStockGroupByOutputType = {
    id: bigint
    userId: string
    stockId: string
    _count: PinnedStockCountAggregateOutputType | null
    _avg: PinnedStockAvgAggregateOutputType | null
    _sum: PinnedStockSumAggregateOutputType | null
    _min: PinnedStockMinAggregateOutputType | null
    _max: PinnedStockMaxAggregateOutputType | null
  }

  type GetPinnedStockGroupByPayload<T extends PinnedStockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PinnedStockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PinnedStockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PinnedStockGroupByOutputType[P]>
            : GetScalarType<T[P], PinnedStockGroupByOutputType[P]>
        }
      >
    >


  export type PinnedStockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stockId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pinnedStock"]>


  export type PinnedStockSelectScalar = {
    id?: boolean
    userId?: boolean
    stockId?: boolean
  }

  export type PinnedStockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PinnedStockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PinnedStock"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      stockId: string
    }, ExtArgs["result"]["pinnedStock"]>
    composites: {}
  }

  type PinnedStockGetPayload<S extends boolean | null | undefined | PinnedStockDefaultArgs> = $Result.GetResult<Prisma.$PinnedStockPayload, S>

  type PinnedStockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PinnedStockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PinnedStockCountAggregateInputType | true
    }

  export interface PinnedStockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PinnedStock'], meta: { name: 'PinnedStock' } }
    /**
     * Find zero or one PinnedStock that matches the filter.
     * @param {PinnedStockFindUniqueArgs} args - Arguments to find a PinnedStock
     * @example
     * // Get one PinnedStock
     * const pinnedStock = await prisma.pinnedStock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PinnedStockFindUniqueArgs>(args: SelectSubset<T, PinnedStockFindUniqueArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PinnedStock that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PinnedStockFindUniqueOrThrowArgs} args - Arguments to find a PinnedStock
     * @example
     * // Get one PinnedStock
     * const pinnedStock = await prisma.pinnedStock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PinnedStockFindUniqueOrThrowArgs>(args: SelectSubset<T, PinnedStockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PinnedStock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockFindFirstArgs} args - Arguments to find a PinnedStock
     * @example
     * // Get one PinnedStock
     * const pinnedStock = await prisma.pinnedStock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PinnedStockFindFirstArgs>(args?: SelectSubset<T, PinnedStockFindFirstArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PinnedStock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockFindFirstOrThrowArgs} args - Arguments to find a PinnedStock
     * @example
     * // Get one PinnedStock
     * const pinnedStock = await prisma.pinnedStock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PinnedStockFindFirstOrThrowArgs>(args?: SelectSubset<T, PinnedStockFindFirstOrThrowArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PinnedStocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PinnedStocks
     * const pinnedStocks = await prisma.pinnedStock.findMany()
     * 
     * // Get first 10 PinnedStocks
     * const pinnedStocks = await prisma.pinnedStock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pinnedStockWithIdOnly = await prisma.pinnedStock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PinnedStockFindManyArgs>(args?: SelectSubset<T, PinnedStockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PinnedStock.
     * @param {PinnedStockCreateArgs} args - Arguments to create a PinnedStock.
     * @example
     * // Create one PinnedStock
     * const PinnedStock = await prisma.pinnedStock.create({
     *   data: {
     *     // ... data to create a PinnedStock
     *   }
     * })
     * 
     */
    create<T extends PinnedStockCreateArgs>(args: SelectSubset<T, PinnedStockCreateArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PinnedStocks.
     * @param {PinnedStockCreateManyArgs} args - Arguments to create many PinnedStocks.
     * @example
     * // Create many PinnedStocks
     * const pinnedStock = await prisma.pinnedStock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PinnedStockCreateManyArgs>(args?: SelectSubset<T, PinnedStockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PinnedStock.
     * @param {PinnedStockDeleteArgs} args - Arguments to delete one PinnedStock.
     * @example
     * // Delete one PinnedStock
     * const PinnedStock = await prisma.pinnedStock.delete({
     *   where: {
     *     // ... filter to delete one PinnedStock
     *   }
     * })
     * 
     */
    delete<T extends PinnedStockDeleteArgs>(args: SelectSubset<T, PinnedStockDeleteArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PinnedStock.
     * @param {PinnedStockUpdateArgs} args - Arguments to update one PinnedStock.
     * @example
     * // Update one PinnedStock
     * const pinnedStock = await prisma.pinnedStock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PinnedStockUpdateArgs>(args: SelectSubset<T, PinnedStockUpdateArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PinnedStocks.
     * @param {PinnedStockDeleteManyArgs} args - Arguments to filter PinnedStocks to delete.
     * @example
     * // Delete a few PinnedStocks
     * const { count } = await prisma.pinnedStock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PinnedStockDeleteManyArgs>(args?: SelectSubset<T, PinnedStockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PinnedStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PinnedStocks
     * const pinnedStock = await prisma.pinnedStock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PinnedStockUpdateManyArgs>(args: SelectSubset<T, PinnedStockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PinnedStock.
     * @param {PinnedStockUpsertArgs} args - Arguments to update or create a PinnedStock.
     * @example
     * // Update or create a PinnedStock
     * const pinnedStock = await prisma.pinnedStock.upsert({
     *   create: {
     *     // ... data to create a PinnedStock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PinnedStock we want to update
     *   }
     * })
     */
    upsert<T extends PinnedStockUpsertArgs>(args: SelectSubset<T, PinnedStockUpsertArgs<ExtArgs>>): Prisma__PinnedStockClient<$Result.GetResult<Prisma.$PinnedStockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PinnedStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockCountArgs} args - Arguments to filter PinnedStocks to count.
     * @example
     * // Count the number of PinnedStocks
     * const count = await prisma.pinnedStock.count({
     *   where: {
     *     // ... the filter for the PinnedStocks we want to count
     *   }
     * })
    **/
    count<T extends PinnedStockCountArgs>(
      args?: Subset<T, PinnedStockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PinnedStockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PinnedStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PinnedStockAggregateArgs>(args: Subset<T, PinnedStockAggregateArgs>): Prisma.PrismaPromise<GetPinnedStockAggregateType<T>>

    /**
     * Group by PinnedStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PinnedStockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PinnedStockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PinnedStockGroupByArgs['orderBy'] }
        : { orderBy?: PinnedStockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PinnedStockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPinnedStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PinnedStock model
   */
  readonly fields: PinnedStockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PinnedStock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PinnedStockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PinnedStock model
   */ 
  interface PinnedStockFieldRefs {
    readonly id: FieldRef<"PinnedStock", 'BigInt'>
    readonly userId: FieldRef<"PinnedStock", 'String'>
    readonly stockId: FieldRef<"PinnedStock", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PinnedStock findUnique
   */
  export type PinnedStockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter, which PinnedStock to fetch.
     */
    where: PinnedStockWhereUniqueInput
  }

  /**
   * PinnedStock findUniqueOrThrow
   */
  export type PinnedStockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter, which PinnedStock to fetch.
     */
    where: PinnedStockWhereUniqueInput
  }

  /**
   * PinnedStock findFirst
   */
  export type PinnedStockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter, which PinnedStock to fetch.
     */
    where?: PinnedStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PinnedStocks to fetch.
     */
    orderBy?: PinnedStockOrderByWithRelationInput | PinnedStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PinnedStocks.
     */
    cursor?: PinnedStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PinnedStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PinnedStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PinnedStocks.
     */
    distinct?: PinnedStockScalarFieldEnum | PinnedStockScalarFieldEnum[]
  }

  /**
   * PinnedStock findFirstOrThrow
   */
  export type PinnedStockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter, which PinnedStock to fetch.
     */
    where?: PinnedStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PinnedStocks to fetch.
     */
    orderBy?: PinnedStockOrderByWithRelationInput | PinnedStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PinnedStocks.
     */
    cursor?: PinnedStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PinnedStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PinnedStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PinnedStocks.
     */
    distinct?: PinnedStockScalarFieldEnum | PinnedStockScalarFieldEnum[]
  }

  /**
   * PinnedStock findMany
   */
  export type PinnedStockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter, which PinnedStocks to fetch.
     */
    where?: PinnedStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PinnedStocks to fetch.
     */
    orderBy?: PinnedStockOrderByWithRelationInput | PinnedStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PinnedStocks.
     */
    cursor?: PinnedStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PinnedStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PinnedStocks.
     */
    skip?: number
    distinct?: PinnedStockScalarFieldEnum | PinnedStockScalarFieldEnum[]
  }

  /**
   * PinnedStock create
   */
  export type PinnedStockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * The data needed to create a PinnedStock.
     */
    data: XOR<PinnedStockCreateInput, PinnedStockUncheckedCreateInput>
  }

  /**
   * PinnedStock createMany
   */
  export type PinnedStockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PinnedStocks.
     */
    data: PinnedStockCreateManyInput | PinnedStockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PinnedStock update
   */
  export type PinnedStockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * The data needed to update a PinnedStock.
     */
    data: XOR<PinnedStockUpdateInput, PinnedStockUncheckedUpdateInput>
    /**
     * Choose, which PinnedStock to update.
     */
    where: PinnedStockWhereUniqueInput
  }

  /**
   * PinnedStock updateMany
   */
  export type PinnedStockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PinnedStocks.
     */
    data: XOR<PinnedStockUpdateManyMutationInput, PinnedStockUncheckedUpdateManyInput>
    /**
     * Filter which PinnedStocks to update
     */
    where?: PinnedStockWhereInput
  }

  /**
   * PinnedStock upsert
   */
  export type PinnedStockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * The filter to search for the PinnedStock to update in case it exists.
     */
    where: PinnedStockWhereUniqueInput
    /**
     * In case the PinnedStock found by the `where` argument doesn't exist, create a new PinnedStock with this data.
     */
    create: XOR<PinnedStockCreateInput, PinnedStockUncheckedCreateInput>
    /**
     * In case the PinnedStock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PinnedStockUpdateInput, PinnedStockUncheckedUpdateInput>
  }

  /**
   * PinnedStock delete
   */
  export type PinnedStockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
    /**
     * Filter which PinnedStock to delete.
     */
    where: PinnedStockWhereUniqueInput
  }

  /**
   * PinnedStock deleteMany
   */
  export type PinnedStockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PinnedStocks to delete
     */
    where?: PinnedStockWhereInput
  }

  /**
   * PinnedStock without action
   */
  export type PinnedStockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PinnedStock
     */
    select?: PinnedStockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PinnedStockInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    birthDate: 'birthDate',
    idCard: 'idCard',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BankAccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    country: 'country',
    currency: 'currency',
    balance: 'balance',
    createdAt: 'createdAt'
  };

  export type BankAccountScalarFieldEnum = (typeof BankAccountScalarFieldEnum)[keyof typeof BankAccountScalarFieldEnum]


  export const TransferTransactionScalarFieldEnum: {
    id: 'id',
    fromAccountId: 'fromAccountId',
    toAccountId: 'toAccountId',
    amount: 'amount',
    createdAt: 'createdAt'
  };

  export type TransferTransactionScalarFieldEnum = (typeof TransferTransactionScalarFieldEnum)[keyof typeof TransferTransactionScalarFieldEnum]


  export const AccountLogScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    transferId: 'transferId',
    type: 'type',
    amount: 'amount',
    balanceBefore: 'balanceBefore',
    balanceAfter: 'balanceAfter',
    createdAt: 'createdAt'
  };

  export type AccountLogScalarFieldEnum = (typeof AccountLogScalarFieldEnum)[keyof typeof AccountLogScalarFieldEnum]


  export const HoldingScalarFieldEnum: {
    userId: 'userId',
    stockId: 'stockId',
    quantity: 'quantity',
    avgCost: 'avgCost'
  };

  export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum]


  export const TransactionStockScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    stockId: 'stockId',
    type: 'type',
    quantity: 'quantity',
    price: 'price',
    tradeDate: 'tradeDate'
  };

  export type TransactionStockScalarFieldEnum = (typeof TransactionStockScalarFieldEnum)[keyof typeof TransactionStockScalarFieldEnum]


  export const PinnedStockScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    stockId: 'stockId'
  };

  export type PinnedStockScalarFieldEnum = (typeof PinnedStockScalarFieldEnum)[keyof typeof PinnedStockScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Country'
   */
  export type EnumCountryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Country'>
    


  /**
   * Reference to a field of type 'Currency'
   */
  export type EnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TradeType'
   */
  export type EnumTradeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    birthDate?: DateTimeFilter<"User"> | Date | string
    idCard?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    accounts?: BankAccountListRelationFilter
    holdings?: HoldingListRelationFilter
    transactions?: TransactionStockListRelationFilter
    pinnedStocks?: PinnedStockListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    idCard?: SortOrder
    createdAt?: SortOrder
    accounts?: BankAccountOrderByRelationAggregateInput
    holdings?: HoldingOrderByRelationAggregateInput
    transactions?: TransactionStockOrderByRelationAggregateInput
    pinnedStocks?: PinnedStockOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idCard?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    birthDate?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    accounts?: BankAccountListRelationFilter
    holdings?: HoldingListRelationFilter
    transactions?: TransactionStockListRelationFilter
    pinnedStocks?: PinnedStockListRelationFilter
  }, "id" | "idCard">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    idCard?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    birthDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    idCard?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BankAccountWhereInput = {
    AND?: BankAccountWhereInput | BankAccountWhereInput[]
    OR?: BankAccountWhereInput[]
    NOT?: BankAccountWhereInput | BankAccountWhereInput[]
    id?: StringFilter<"BankAccount"> | string
    userId?: StringFilter<"BankAccount"> | string
    country?: EnumCountryFilter<"BankAccount"> | $Enums.Country
    currency?: EnumCurrencyFilter<"BankAccount"> | $Enums.Currency
    balance?: DecimalFilter<"BankAccount"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    logs?: AccountLogListRelationFilter
    sentTransfers?: TransferTransactionListRelationFilter
    receivedTransfers?: TransferTransactionListRelationFilter
  }

  export type BankAccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    logs?: AccountLogOrderByRelationAggregateInput
    sentTransfers?: TransferTransactionOrderByRelationAggregateInput
    receivedTransfers?: TransferTransactionOrderByRelationAggregateInput
  }

  export type BankAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_country_currency?: BankAccountUserIdCountryCurrencyCompoundUniqueInput
    AND?: BankAccountWhereInput | BankAccountWhereInput[]
    OR?: BankAccountWhereInput[]
    NOT?: BankAccountWhereInput | BankAccountWhereInput[]
    userId?: StringFilter<"BankAccount"> | string
    country?: EnumCountryFilter<"BankAccount"> | $Enums.Country
    currency?: EnumCurrencyFilter<"BankAccount"> | $Enums.Currency
    balance?: DecimalFilter<"BankAccount"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    logs?: AccountLogListRelationFilter
    sentTransfers?: TransferTransactionListRelationFilter
    receivedTransfers?: TransferTransactionListRelationFilter
  }, "id" | "userId_country_currency">

  export type BankAccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    _count?: BankAccountCountOrderByAggregateInput
    _avg?: BankAccountAvgOrderByAggregateInput
    _max?: BankAccountMaxOrderByAggregateInput
    _min?: BankAccountMinOrderByAggregateInput
    _sum?: BankAccountSumOrderByAggregateInput
  }

  export type BankAccountScalarWhereWithAggregatesInput = {
    AND?: BankAccountScalarWhereWithAggregatesInput | BankAccountScalarWhereWithAggregatesInput[]
    OR?: BankAccountScalarWhereWithAggregatesInput[]
    NOT?: BankAccountScalarWhereWithAggregatesInput | BankAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankAccount"> | string
    userId?: StringWithAggregatesFilter<"BankAccount"> | string
    country?: EnumCountryWithAggregatesFilter<"BankAccount"> | $Enums.Country
    currency?: EnumCurrencyWithAggregatesFilter<"BankAccount"> | $Enums.Currency
    balance?: DecimalWithAggregatesFilter<"BankAccount"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"BankAccount"> | Date | string
  }

  export type TransferTransactionWhereInput = {
    AND?: TransferTransactionWhereInput | TransferTransactionWhereInput[]
    OR?: TransferTransactionWhereInput[]
    NOT?: TransferTransactionWhereInput | TransferTransactionWhereInput[]
    id?: BigIntFilter<"TransferTransaction"> | bigint | number
    fromAccountId?: StringFilter<"TransferTransaction"> | string
    toAccountId?: StringFilter<"TransferTransaction"> | string
    amount?: DecimalFilter<"TransferTransaction"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"TransferTransaction"> | Date | string
    fromAccount?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    toAccount?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    logs?: AccountLogListRelationFilter
  }

  export type TransferTransactionOrderByWithRelationInput = {
    id?: SortOrder
    fromAccountId?: SortOrder
    toAccountId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    fromAccount?: BankAccountOrderByWithRelationInput
    toAccount?: BankAccountOrderByWithRelationInput
    logs?: AccountLogOrderByRelationAggregateInput
  }

  export type TransferTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: TransferTransactionWhereInput | TransferTransactionWhereInput[]
    OR?: TransferTransactionWhereInput[]
    NOT?: TransferTransactionWhereInput | TransferTransactionWhereInput[]
    fromAccountId?: StringFilter<"TransferTransaction"> | string
    toAccountId?: StringFilter<"TransferTransaction"> | string
    amount?: DecimalFilter<"TransferTransaction"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"TransferTransaction"> | Date | string
    fromAccount?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    toAccount?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    logs?: AccountLogListRelationFilter
  }, "id">

  export type TransferTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    fromAccountId?: SortOrder
    toAccountId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    _count?: TransferTransactionCountOrderByAggregateInput
    _avg?: TransferTransactionAvgOrderByAggregateInput
    _max?: TransferTransactionMaxOrderByAggregateInput
    _min?: TransferTransactionMinOrderByAggregateInput
    _sum?: TransferTransactionSumOrderByAggregateInput
  }

  export type TransferTransactionScalarWhereWithAggregatesInput = {
    AND?: TransferTransactionScalarWhereWithAggregatesInput | TransferTransactionScalarWhereWithAggregatesInput[]
    OR?: TransferTransactionScalarWhereWithAggregatesInput[]
    NOT?: TransferTransactionScalarWhereWithAggregatesInput | TransferTransactionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"TransferTransaction"> | bigint | number
    fromAccountId?: StringWithAggregatesFilter<"TransferTransaction"> | string
    toAccountId?: StringWithAggregatesFilter<"TransferTransaction"> | string
    amount?: DecimalWithAggregatesFilter<"TransferTransaction"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"TransferTransaction"> | Date | string
  }

  export type AccountLogWhereInput = {
    AND?: AccountLogWhereInput | AccountLogWhereInput[]
    OR?: AccountLogWhereInput[]
    NOT?: AccountLogWhereInput | AccountLogWhereInput[]
    id?: BigIntFilter<"AccountLog"> | bigint | number
    accountId?: StringFilter<"AccountLog"> | string
    transferId?: BigIntNullableFilter<"AccountLog"> | bigint | number | null
    type?: EnumTransactionTypeFilter<"AccountLog"> | $Enums.TransactionType
    amount?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AccountLog"> | Date | string
    account?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    transfer?: XOR<TransferTransactionNullableRelationFilter, TransferTransactionWhereInput> | null
  }

  export type AccountLogOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    transferId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    account?: BankAccountOrderByWithRelationInput
    transfer?: TransferTransactionOrderByWithRelationInput
  }

  export type AccountLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: AccountLogWhereInput | AccountLogWhereInput[]
    OR?: AccountLogWhereInput[]
    NOT?: AccountLogWhereInput | AccountLogWhereInput[]
    accountId?: StringFilter<"AccountLog"> | string
    transferId?: BigIntNullableFilter<"AccountLog"> | bigint | number | null
    type?: EnumTransactionTypeFilter<"AccountLog"> | $Enums.TransactionType
    amount?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AccountLog"> | Date | string
    account?: XOR<BankAccountRelationFilter, BankAccountWhereInput>
    transfer?: XOR<TransferTransactionNullableRelationFilter, TransferTransactionWhereInput> | null
  }, "id">

  export type AccountLogOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    transferId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    _count?: AccountLogCountOrderByAggregateInput
    _avg?: AccountLogAvgOrderByAggregateInput
    _max?: AccountLogMaxOrderByAggregateInput
    _min?: AccountLogMinOrderByAggregateInput
    _sum?: AccountLogSumOrderByAggregateInput
  }

  export type AccountLogScalarWhereWithAggregatesInput = {
    AND?: AccountLogScalarWhereWithAggregatesInput | AccountLogScalarWhereWithAggregatesInput[]
    OR?: AccountLogScalarWhereWithAggregatesInput[]
    NOT?: AccountLogScalarWhereWithAggregatesInput | AccountLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"AccountLog"> | bigint | number
    accountId?: StringWithAggregatesFilter<"AccountLog"> | string
    transferId?: BigIntNullableWithAggregatesFilter<"AccountLog"> | bigint | number | null
    type?: EnumTransactionTypeWithAggregatesFilter<"AccountLog"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalWithAggregatesFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalWithAggregatesFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"AccountLog"> | Date | string
  }

  export type HoldingWhereInput = {
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    userId?: StringFilter<"Holding"> | string
    stockId?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type HoldingOrderByWithRelationInput = {
    userId?: SortOrder
    stockId?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type HoldingWhereUniqueInput = Prisma.AtLeast<{
    userId_stockId?: HoldingUserIdStockIdCompoundUniqueInput
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    userId?: StringFilter<"Holding"> | string
    stockId?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "userId_stockId">

  export type HoldingOrderByWithAggregationInput = {
    userId?: SortOrder
    stockId?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    _count?: HoldingCountOrderByAggregateInput
    _avg?: HoldingAvgOrderByAggregateInput
    _max?: HoldingMaxOrderByAggregateInput
    _min?: HoldingMinOrderByAggregateInput
    _sum?: HoldingSumOrderByAggregateInput
  }

  export type HoldingScalarWhereWithAggregatesInput = {
    AND?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    OR?: HoldingScalarWhereWithAggregatesInput[]
    NOT?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Holding"> | string
    stockId?: StringWithAggregatesFilter<"Holding"> | string
    quantity?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
  }

  export type TransactionStockWhereInput = {
    AND?: TransactionStockWhereInput | TransactionStockWhereInput[]
    OR?: TransactionStockWhereInput[]
    NOT?: TransactionStockWhereInput | TransactionStockWhereInput[]
    id?: BigIntFilter<"TransactionStock"> | bigint | number
    userId?: StringFilter<"TransactionStock"> | string
    stockId?: StringFilter<"TransactionStock"> | string
    type?: EnumTradeTypeFilter<"TransactionStock"> | $Enums.TradeType
    quantity?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFilter<"TransactionStock"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TransactionStockOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    tradeDate?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TransactionStockWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: TransactionStockWhereInput | TransactionStockWhereInput[]
    OR?: TransactionStockWhereInput[]
    NOT?: TransactionStockWhereInput | TransactionStockWhereInput[]
    userId?: StringFilter<"TransactionStock"> | string
    stockId?: StringFilter<"TransactionStock"> | string
    type?: EnumTradeTypeFilter<"TransactionStock"> | $Enums.TradeType
    quantity?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFilter<"TransactionStock"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type TransactionStockOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    tradeDate?: SortOrder
    _count?: TransactionStockCountOrderByAggregateInput
    _avg?: TransactionStockAvgOrderByAggregateInput
    _max?: TransactionStockMaxOrderByAggregateInput
    _min?: TransactionStockMinOrderByAggregateInput
    _sum?: TransactionStockSumOrderByAggregateInput
  }

  export type TransactionStockScalarWhereWithAggregatesInput = {
    AND?: TransactionStockScalarWhereWithAggregatesInput | TransactionStockScalarWhereWithAggregatesInput[]
    OR?: TransactionStockScalarWhereWithAggregatesInput[]
    NOT?: TransactionStockScalarWhereWithAggregatesInput | TransactionStockScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"TransactionStock"> | bigint | number
    userId?: StringWithAggregatesFilter<"TransactionStock"> | string
    stockId?: StringWithAggregatesFilter<"TransactionStock"> | string
    type?: EnumTradeTypeWithAggregatesFilter<"TransactionStock"> | $Enums.TradeType
    quantity?: DecimalWithAggregatesFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    price?: DecimalWithAggregatesFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeWithAggregatesFilter<"TransactionStock"> | Date | string
  }

  export type PinnedStockWhereInput = {
    AND?: PinnedStockWhereInput | PinnedStockWhereInput[]
    OR?: PinnedStockWhereInput[]
    NOT?: PinnedStockWhereInput | PinnedStockWhereInput[]
    id?: BigIntFilter<"PinnedStock"> | bigint | number
    userId?: StringFilter<"PinnedStock"> | string
    stockId?: StringFilter<"PinnedStock"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PinnedStockOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PinnedStockWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    userId_stockId?: PinnedStockUserIdStockIdCompoundUniqueInput
    AND?: PinnedStockWhereInput | PinnedStockWhereInput[]
    OR?: PinnedStockWhereInput[]
    NOT?: PinnedStockWhereInput | PinnedStockWhereInput[]
    userId?: StringFilter<"PinnedStock"> | string
    stockId?: StringFilter<"PinnedStock"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_stockId">

  export type PinnedStockOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    _count?: PinnedStockCountOrderByAggregateInput
    _avg?: PinnedStockAvgOrderByAggregateInput
    _max?: PinnedStockMaxOrderByAggregateInput
    _min?: PinnedStockMinOrderByAggregateInput
    _sum?: PinnedStockSumOrderByAggregateInput
  }

  export type PinnedStockScalarWhereWithAggregatesInput = {
    AND?: PinnedStockScalarWhereWithAggregatesInput | PinnedStockScalarWhereWithAggregatesInput[]
    OR?: PinnedStockScalarWhereWithAggregatesInput[]
    NOT?: PinnedStockScalarWhereWithAggregatesInput | PinnedStockScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PinnedStock"> | bigint | number
    userId?: StringWithAggregatesFilter<"PinnedStock"> | string
    stockId?: StringWithAggregatesFilter<"PinnedStock"> | string
  }

  export type UserCreateInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    transactions?: TransactionStockCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionStockUncheckedCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUncheckedUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankAccountCreateInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    logs?: AccountLogCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountUncheckedCreateInput = {
    id?: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    logs?: AccountLogUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUncheckedUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountCreateManyInput = {
    id?: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BankAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferTransactionCreateInput = {
    id?: bigint | number
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    fromAccount: BankAccountCreateNestedOneWithoutSentTransfersInput
    toAccount: BankAccountCreateNestedOneWithoutReceivedTransfersInput
    logs?: AccountLogCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionUncheckedCreateInput = {
    id?: bigint | number
    fromAccountId: string
    toAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromAccount?: BankAccountUpdateOneRequiredWithoutSentTransfersNestedInput
    toAccount?: BankAccountUpdateOneRequiredWithoutReceivedTransfersNestedInput
    logs?: AccountLogUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAccountId?: StringFieldUpdateOperationsInput | string
    toAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionCreateManyInput = {
    id?: bigint | number
    fromAccountId: string
    toAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type TransferTransactionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferTransactionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAccountId?: StringFieldUpdateOperationsInput | string
    toAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogCreateInput = {
    id?: bigint | number
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    account: BankAccountCreateNestedOneWithoutLogsInput
    transfer?: TransferTransactionCreateNestedOneWithoutLogsInput
  }

  export type AccountLogUncheckedCreateInput = {
    id?: bigint | number
    accountId: string
    transferId?: bigint | number | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: BankAccountUpdateOneRequiredWithoutLogsNestedInput
    transfer?: TransferTransactionUpdateOneWithoutLogsNestedInput
  }

  export type AccountLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: StringFieldUpdateOperationsInput | string
    transferId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogCreateManyInput = {
    id?: bigint | number
    accountId: string
    transferId?: bigint | number | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: StringFieldUpdateOperationsInput | string
    transferId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateInput = {
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateInput = {
    userId: string
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
  }

  export type HoldingUpdateInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type HoldingCreateManyInput = {
    userId: string
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
  }

  export type HoldingUpdateManyMutationInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type HoldingUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TransactionStockCreateInput = {
    id?: bigint | number
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionStockUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
  }

  export type TransactionStockUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionStockUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionStockCreateManyInput = {
    id?: bigint | number
    userId: string
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
  }

  export type TransactionStockUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionStockUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PinnedStockCreateInput = {
    id?: bigint | number
    stockId: string
    user: UserCreateNestedOneWithoutPinnedStocksInput
  }

  export type PinnedStockUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    stockId: string
  }

  export type PinnedStockUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPinnedStocksNestedInput
  }

  export type PinnedStockUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type PinnedStockCreateManyInput = {
    id?: bigint | number
    userId: string
    stockId: string
  }

  export type PinnedStockUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type PinnedStockUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BankAccountListRelationFilter = {
    every?: BankAccountWhereInput
    some?: BankAccountWhereInput
    none?: BankAccountWhereInput
  }

  export type HoldingListRelationFilter = {
    every?: HoldingWhereInput
    some?: HoldingWhereInput
    none?: HoldingWhereInput
  }

  export type TransactionStockListRelationFilter = {
    every?: TransactionStockWhereInput
    some?: TransactionStockWhereInput
    none?: TransactionStockWhereInput
  }

  export type PinnedStockListRelationFilter = {
    every?: PinnedStockWhereInput
    some?: PinnedStockWhereInput
    none?: PinnedStockWhereInput
  }

  export type BankAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HoldingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionStockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PinnedStockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    idCard?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    idCard?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    idCard?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCountryFilter<$PrismaModel = never> = {
    equals?: $Enums.Country | EnumCountryFieldRefInput<$PrismaModel>
    in?: $Enums.Country[]
    notIn?: $Enums.Country[]
    not?: NestedEnumCountryFilter<$PrismaModel> | $Enums.Country
  }

  export type EnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[]
    notIn?: $Enums.Currency[]
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountLogListRelationFilter = {
    every?: AccountLogWhereInput
    some?: AccountLogWhereInput
    none?: AccountLogWhereInput
  }

  export type TransferTransactionListRelationFilter = {
    every?: TransferTransactionWhereInput
    some?: TransferTransactionWhereInput
    none?: TransferTransactionWhereInput
  }

  export type AccountLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransferTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankAccountUserIdCountryCurrencyCompoundUniqueInput = {
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
  }

  export type BankAccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type BankAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumCountryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Country | EnumCountryFieldRefInput<$PrismaModel>
    in?: $Enums.Country[]
    notIn?: $Enums.Country[]
    not?: NestedEnumCountryWithAggregatesFilter<$PrismaModel> | $Enums.Country
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCountryFilter<$PrismaModel>
    _max?: NestedEnumCountryFilter<$PrismaModel>
  }

  export type EnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[]
    notIn?: $Enums.Currency[]
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BankAccountRelationFilter = {
    is?: BankAccountWhereInput
    isNot?: BankAccountWhereInput
  }

  export type TransferTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    fromAccountId?: SortOrder
    toAccountId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TransferTransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type TransferTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    fromAccountId?: SortOrder
    toAccountId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TransferTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    fromAccountId?: SortOrder
    toAccountId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TransferTransactionSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type TransferTransactionNullableRelationFilter = {
    is?: TransferTransactionWhereInput | null
    isNot?: TransferTransactionWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountLogCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    transferId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountLogAvgOrderByAggregateInput = {
    id?: SortOrder
    transferId?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type AccountLogMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    transferId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountLogMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    transferId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountLogSumOrderByAggregateInput = {
    id?: SortOrder
    transferId?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type HoldingUserIdStockIdCompoundUniqueInput = {
    userId: string
    stockId: string
  }

  export type HoldingCountOrderByAggregateInput = {
    userId?: SortOrder
    stockId?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
  }

  export type HoldingAvgOrderByAggregateInput = {
    quantity?: SortOrder
    avgCost?: SortOrder
  }

  export type HoldingMaxOrderByAggregateInput = {
    userId?: SortOrder
    stockId?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
  }

  export type HoldingMinOrderByAggregateInput = {
    userId?: SortOrder
    stockId?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
  }

  export type HoldingSumOrderByAggregateInput = {
    quantity?: SortOrder
    avgCost?: SortOrder
  }

  export type EnumTradeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeType | EnumTradeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TradeType[]
    notIn?: $Enums.TradeType[]
    not?: NestedEnumTradeTypeFilter<$PrismaModel> | $Enums.TradeType
  }

  export type TransactionStockCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    tradeDate?: SortOrder
  }

  export type TransactionStockAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
  }

  export type TransactionStockMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    tradeDate?: SortOrder
  }

  export type TransactionStockMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    tradeDate?: SortOrder
  }

  export type TransactionStockSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
  }

  export type EnumTradeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeType | EnumTradeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TradeType[]
    notIn?: $Enums.TradeType[]
    not?: NestedEnumTradeTypeWithAggregatesFilter<$PrismaModel> | $Enums.TradeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeTypeFilter<$PrismaModel>
    _max?: NestedEnumTradeTypeFilter<$PrismaModel>
  }

  export type PinnedStockUserIdStockIdCompoundUniqueInput = {
    userId: string
    stockId: string
  }

  export type PinnedStockCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
  }

  export type PinnedStockAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PinnedStockMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
  }

  export type PinnedStockMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stockId?: SortOrder
  }

  export type PinnedStockSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BankAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
  }

  export type HoldingCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type TransactionStockCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput> | TransactionStockCreateWithoutUserInput[] | TransactionStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionStockCreateOrConnectWithoutUserInput | TransactionStockCreateOrConnectWithoutUserInput[]
    createMany?: TransactionStockCreateManyUserInputEnvelope
    connect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
  }

  export type PinnedStockCreateNestedManyWithoutUserInput = {
    create?: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput> | PinnedStockCreateWithoutUserInput[] | PinnedStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PinnedStockCreateOrConnectWithoutUserInput | PinnedStockCreateOrConnectWithoutUserInput[]
    createMany?: PinnedStockCreateManyUserInputEnvelope
    connect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
  }

  export type BankAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
  }

  export type HoldingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type TransactionStockUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput> | TransactionStockCreateWithoutUserInput[] | TransactionStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionStockCreateOrConnectWithoutUserInput | TransactionStockCreateOrConnectWithoutUserInput[]
    createMany?: TransactionStockCreateManyUserInputEnvelope
    connect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
  }

  export type PinnedStockUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput> | PinnedStockCreateWithoutUserInput[] | PinnedStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PinnedStockCreateOrConnectWithoutUserInput | PinnedStockCreateOrConnectWithoutUserInput[]
    createMany?: PinnedStockCreateManyUserInputEnvelope
    connect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BankAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    upsert?: BankAccountUpsertWithWhereUniqueWithoutUserInput | BankAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    set?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    disconnect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    delete?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    update?: BankAccountUpdateWithWhereUniqueWithoutUserInput | BankAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BankAccountUpdateManyWithWhereWithoutUserInput | BankAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
  }

  export type HoldingUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutUserInput | HoldingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutUserInput | HoldingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutUserInput | HoldingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type TransactionStockUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput> | TransactionStockCreateWithoutUserInput[] | TransactionStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionStockCreateOrConnectWithoutUserInput | TransactionStockCreateOrConnectWithoutUserInput[]
    upsert?: TransactionStockUpsertWithWhereUniqueWithoutUserInput | TransactionStockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionStockCreateManyUserInputEnvelope
    set?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    disconnect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    delete?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    connect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    update?: TransactionStockUpdateWithWhereUniqueWithoutUserInput | TransactionStockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionStockUpdateManyWithWhereWithoutUserInput | TransactionStockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionStockScalarWhereInput | TransactionStockScalarWhereInput[]
  }

  export type PinnedStockUpdateManyWithoutUserNestedInput = {
    create?: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput> | PinnedStockCreateWithoutUserInput[] | PinnedStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PinnedStockCreateOrConnectWithoutUserInput | PinnedStockCreateOrConnectWithoutUserInput[]
    upsert?: PinnedStockUpsertWithWhereUniqueWithoutUserInput | PinnedStockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PinnedStockCreateManyUserInputEnvelope
    set?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    disconnect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    delete?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    connect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    update?: PinnedStockUpdateWithWhereUniqueWithoutUserInput | PinnedStockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PinnedStockUpdateManyWithWhereWithoutUserInput | PinnedStockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PinnedStockScalarWhereInput | PinnedStockScalarWhereInput[]
  }

  export type BankAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    upsert?: BankAccountUpsertWithWhereUniqueWithoutUserInput | BankAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    set?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    disconnect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    delete?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    update?: BankAccountUpdateWithWhereUniqueWithoutUserInput | BankAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BankAccountUpdateManyWithWhereWithoutUserInput | BankAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
  }

  export type HoldingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutUserInput | HoldingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutUserInput | HoldingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutUserInput | HoldingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type TransactionStockUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput> | TransactionStockCreateWithoutUserInput[] | TransactionStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionStockCreateOrConnectWithoutUserInput | TransactionStockCreateOrConnectWithoutUserInput[]
    upsert?: TransactionStockUpsertWithWhereUniqueWithoutUserInput | TransactionStockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionStockCreateManyUserInputEnvelope
    set?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    disconnect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    delete?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    connect?: TransactionStockWhereUniqueInput | TransactionStockWhereUniqueInput[]
    update?: TransactionStockUpdateWithWhereUniqueWithoutUserInput | TransactionStockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionStockUpdateManyWithWhereWithoutUserInput | TransactionStockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionStockScalarWhereInput | TransactionStockScalarWhereInput[]
  }

  export type PinnedStockUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput> | PinnedStockCreateWithoutUserInput[] | PinnedStockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PinnedStockCreateOrConnectWithoutUserInput | PinnedStockCreateOrConnectWithoutUserInput[]
    upsert?: PinnedStockUpsertWithWhereUniqueWithoutUserInput | PinnedStockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PinnedStockCreateManyUserInputEnvelope
    set?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    disconnect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    delete?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    connect?: PinnedStockWhereUniqueInput | PinnedStockWhereUniqueInput[]
    update?: PinnedStockUpdateWithWhereUniqueWithoutUserInput | PinnedStockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PinnedStockUpdateManyWithWhereWithoutUserInput | PinnedStockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PinnedStockScalarWhereInput | PinnedStockScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type AccountLogCreateNestedManyWithoutAccountInput = {
    create?: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput> | AccountLogCreateWithoutAccountInput[] | AccountLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutAccountInput | AccountLogCreateOrConnectWithoutAccountInput[]
    createMany?: AccountLogCreateManyAccountInputEnvelope
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
  }

  export type TransferTransactionCreateNestedManyWithoutFromAccountInput = {
    create?: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput> | TransferTransactionCreateWithoutFromAccountInput[] | TransferTransactionUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutFromAccountInput | TransferTransactionCreateOrConnectWithoutFromAccountInput[]
    createMany?: TransferTransactionCreateManyFromAccountInputEnvelope
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
  }

  export type TransferTransactionCreateNestedManyWithoutToAccountInput = {
    create?: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput> | TransferTransactionCreateWithoutToAccountInput[] | TransferTransactionUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutToAccountInput | TransferTransactionCreateOrConnectWithoutToAccountInput[]
    createMany?: TransferTransactionCreateManyToAccountInputEnvelope
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
  }

  export type AccountLogUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput> | AccountLogCreateWithoutAccountInput[] | AccountLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutAccountInput | AccountLogCreateOrConnectWithoutAccountInput[]
    createMany?: AccountLogCreateManyAccountInputEnvelope
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
  }

  export type TransferTransactionUncheckedCreateNestedManyWithoutFromAccountInput = {
    create?: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput> | TransferTransactionCreateWithoutFromAccountInput[] | TransferTransactionUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutFromAccountInput | TransferTransactionCreateOrConnectWithoutFromAccountInput[]
    createMany?: TransferTransactionCreateManyFromAccountInputEnvelope
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
  }

  export type TransferTransactionUncheckedCreateNestedManyWithoutToAccountInput = {
    create?: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput> | TransferTransactionCreateWithoutToAccountInput[] | TransferTransactionUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutToAccountInput | TransferTransactionCreateOrConnectWithoutToAccountInput[]
    createMany?: TransferTransactionCreateManyToAccountInputEnvelope
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
  }

  export type EnumCountryFieldUpdateOperationsInput = {
    set?: $Enums.Country
  }

  export type EnumCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.Currency
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type AccountLogUpdateManyWithoutAccountNestedInput = {
    create?: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput> | AccountLogCreateWithoutAccountInput[] | AccountLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutAccountInput | AccountLogCreateOrConnectWithoutAccountInput[]
    upsert?: AccountLogUpsertWithWhereUniqueWithoutAccountInput | AccountLogUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: AccountLogCreateManyAccountInputEnvelope
    set?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    disconnect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    delete?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    update?: AccountLogUpdateWithWhereUniqueWithoutAccountInput | AccountLogUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: AccountLogUpdateManyWithWhereWithoutAccountInput | AccountLogUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
  }

  export type TransferTransactionUpdateManyWithoutFromAccountNestedInput = {
    create?: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput> | TransferTransactionCreateWithoutFromAccountInput[] | TransferTransactionUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutFromAccountInput | TransferTransactionCreateOrConnectWithoutFromAccountInput[]
    upsert?: TransferTransactionUpsertWithWhereUniqueWithoutFromAccountInput | TransferTransactionUpsertWithWhereUniqueWithoutFromAccountInput[]
    createMany?: TransferTransactionCreateManyFromAccountInputEnvelope
    set?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    disconnect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    delete?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    update?: TransferTransactionUpdateWithWhereUniqueWithoutFromAccountInput | TransferTransactionUpdateWithWhereUniqueWithoutFromAccountInput[]
    updateMany?: TransferTransactionUpdateManyWithWhereWithoutFromAccountInput | TransferTransactionUpdateManyWithWhereWithoutFromAccountInput[]
    deleteMany?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
  }

  export type TransferTransactionUpdateManyWithoutToAccountNestedInput = {
    create?: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput> | TransferTransactionCreateWithoutToAccountInput[] | TransferTransactionUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutToAccountInput | TransferTransactionCreateOrConnectWithoutToAccountInput[]
    upsert?: TransferTransactionUpsertWithWhereUniqueWithoutToAccountInput | TransferTransactionUpsertWithWhereUniqueWithoutToAccountInput[]
    createMany?: TransferTransactionCreateManyToAccountInputEnvelope
    set?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    disconnect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    delete?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    update?: TransferTransactionUpdateWithWhereUniqueWithoutToAccountInput | TransferTransactionUpdateWithWhereUniqueWithoutToAccountInput[]
    updateMany?: TransferTransactionUpdateManyWithWhereWithoutToAccountInput | TransferTransactionUpdateManyWithWhereWithoutToAccountInput[]
    deleteMany?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
  }

  export type AccountLogUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput> | AccountLogCreateWithoutAccountInput[] | AccountLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutAccountInput | AccountLogCreateOrConnectWithoutAccountInput[]
    upsert?: AccountLogUpsertWithWhereUniqueWithoutAccountInput | AccountLogUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: AccountLogCreateManyAccountInputEnvelope
    set?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    disconnect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    delete?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    update?: AccountLogUpdateWithWhereUniqueWithoutAccountInput | AccountLogUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: AccountLogUpdateManyWithWhereWithoutAccountInput | AccountLogUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
  }

  export type TransferTransactionUncheckedUpdateManyWithoutFromAccountNestedInput = {
    create?: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput> | TransferTransactionCreateWithoutFromAccountInput[] | TransferTransactionUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutFromAccountInput | TransferTransactionCreateOrConnectWithoutFromAccountInput[]
    upsert?: TransferTransactionUpsertWithWhereUniqueWithoutFromAccountInput | TransferTransactionUpsertWithWhereUniqueWithoutFromAccountInput[]
    createMany?: TransferTransactionCreateManyFromAccountInputEnvelope
    set?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    disconnect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    delete?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    update?: TransferTransactionUpdateWithWhereUniqueWithoutFromAccountInput | TransferTransactionUpdateWithWhereUniqueWithoutFromAccountInput[]
    updateMany?: TransferTransactionUpdateManyWithWhereWithoutFromAccountInput | TransferTransactionUpdateManyWithWhereWithoutFromAccountInput[]
    deleteMany?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
  }

  export type TransferTransactionUncheckedUpdateManyWithoutToAccountNestedInput = {
    create?: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput> | TransferTransactionCreateWithoutToAccountInput[] | TransferTransactionUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutToAccountInput | TransferTransactionCreateOrConnectWithoutToAccountInput[]
    upsert?: TransferTransactionUpsertWithWhereUniqueWithoutToAccountInput | TransferTransactionUpsertWithWhereUniqueWithoutToAccountInput[]
    createMany?: TransferTransactionCreateManyToAccountInputEnvelope
    set?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    disconnect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    delete?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    connect?: TransferTransactionWhereUniqueInput | TransferTransactionWhereUniqueInput[]
    update?: TransferTransactionUpdateWithWhereUniqueWithoutToAccountInput | TransferTransactionUpdateWithWhereUniqueWithoutToAccountInput[]
    updateMany?: TransferTransactionUpdateManyWithWhereWithoutToAccountInput | TransferTransactionUpdateManyWithWhereWithoutToAccountInput[]
    deleteMany?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
  }

  export type BankAccountCreateNestedOneWithoutSentTransfersInput = {
    create?: XOR<BankAccountCreateWithoutSentTransfersInput, BankAccountUncheckedCreateWithoutSentTransfersInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutSentTransfersInput
    connect?: BankAccountWhereUniqueInput
  }

  export type BankAccountCreateNestedOneWithoutReceivedTransfersInput = {
    create?: XOR<BankAccountCreateWithoutReceivedTransfersInput, BankAccountUncheckedCreateWithoutReceivedTransfersInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutReceivedTransfersInput
    connect?: BankAccountWhereUniqueInput
  }

  export type AccountLogCreateNestedManyWithoutTransferInput = {
    create?: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput> | AccountLogCreateWithoutTransferInput[] | AccountLogUncheckedCreateWithoutTransferInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutTransferInput | AccountLogCreateOrConnectWithoutTransferInput[]
    createMany?: AccountLogCreateManyTransferInputEnvelope
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
  }

  export type AccountLogUncheckedCreateNestedManyWithoutTransferInput = {
    create?: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput> | AccountLogCreateWithoutTransferInput[] | AccountLogUncheckedCreateWithoutTransferInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutTransferInput | AccountLogCreateOrConnectWithoutTransferInput[]
    createMany?: AccountLogCreateManyTransferInputEnvelope
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BankAccountUpdateOneRequiredWithoutSentTransfersNestedInput = {
    create?: XOR<BankAccountCreateWithoutSentTransfersInput, BankAccountUncheckedCreateWithoutSentTransfersInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutSentTransfersInput
    upsert?: BankAccountUpsertWithoutSentTransfersInput
    connect?: BankAccountWhereUniqueInput
    update?: XOR<XOR<BankAccountUpdateToOneWithWhereWithoutSentTransfersInput, BankAccountUpdateWithoutSentTransfersInput>, BankAccountUncheckedUpdateWithoutSentTransfersInput>
  }

  export type BankAccountUpdateOneRequiredWithoutReceivedTransfersNestedInput = {
    create?: XOR<BankAccountCreateWithoutReceivedTransfersInput, BankAccountUncheckedCreateWithoutReceivedTransfersInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutReceivedTransfersInput
    upsert?: BankAccountUpsertWithoutReceivedTransfersInput
    connect?: BankAccountWhereUniqueInput
    update?: XOR<XOR<BankAccountUpdateToOneWithWhereWithoutReceivedTransfersInput, BankAccountUpdateWithoutReceivedTransfersInput>, BankAccountUncheckedUpdateWithoutReceivedTransfersInput>
  }

  export type AccountLogUpdateManyWithoutTransferNestedInput = {
    create?: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput> | AccountLogCreateWithoutTransferInput[] | AccountLogUncheckedCreateWithoutTransferInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutTransferInput | AccountLogCreateOrConnectWithoutTransferInput[]
    upsert?: AccountLogUpsertWithWhereUniqueWithoutTransferInput | AccountLogUpsertWithWhereUniqueWithoutTransferInput[]
    createMany?: AccountLogCreateManyTransferInputEnvelope
    set?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    disconnect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    delete?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    update?: AccountLogUpdateWithWhereUniqueWithoutTransferInput | AccountLogUpdateWithWhereUniqueWithoutTransferInput[]
    updateMany?: AccountLogUpdateManyWithWhereWithoutTransferInput | AccountLogUpdateManyWithWhereWithoutTransferInput[]
    deleteMany?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
  }

  export type AccountLogUncheckedUpdateManyWithoutTransferNestedInput = {
    create?: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput> | AccountLogCreateWithoutTransferInput[] | AccountLogUncheckedCreateWithoutTransferInput[]
    connectOrCreate?: AccountLogCreateOrConnectWithoutTransferInput | AccountLogCreateOrConnectWithoutTransferInput[]
    upsert?: AccountLogUpsertWithWhereUniqueWithoutTransferInput | AccountLogUpsertWithWhereUniqueWithoutTransferInput[]
    createMany?: AccountLogCreateManyTransferInputEnvelope
    set?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    disconnect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    delete?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    connect?: AccountLogWhereUniqueInput | AccountLogWhereUniqueInput[]
    update?: AccountLogUpdateWithWhereUniqueWithoutTransferInput | AccountLogUpdateWithWhereUniqueWithoutTransferInput[]
    updateMany?: AccountLogUpdateManyWithWhereWithoutTransferInput | AccountLogUpdateManyWithWhereWithoutTransferInput[]
    deleteMany?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
  }

  export type BankAccountCreateNestedOneWithoutLogsInput = {
    create?: XOR<BankAccountCreateWithoutLogsInput, BankAccountUncheckedCreateWithoutLogsInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutLogsInput
    connect?: BankAccountWhereUniqueInput
  }

  export type TransferTransactionCreateNestedOneWithoutLogsInput = {
    create?: XOR<TransferTransactionCreateWithoutLogsInput, TransferTransactionUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutLogsInput
    connect?: TransferTransactionWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type BankAccountUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<BankAccountCreateWithoutLogsInput, BankAccountUncheckedCreateWithoutLogsInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutLogsInput
    upsert?: BankAccountUpsertWithoutLogsInput
    connect?: BankAccountWhereUniqueInput
    update?: XOR<XOR<BankAccountUpdateToOneWithWhereWithoutLogsInput, BankAccountUpdateWithoutLogsInput>, BankAccountUncheckedUpdateWithoutLogsInput>
  }

  export type TransferTransactionUpdateOneWithoutLogsNestedInput = {
    create?: XOR<TransferTransactionCreateWithoutLogsInput, TransferTransactionUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TransferTransactionCreateOrConnectWithoutLogsInput
    upsert?: TransferTransactionUpsertWithoutLogsInput
    disconnect?: TransferTransactionWhereInput | boolean
    delete?: TransferTransactionWhereInput | boolean
    connect?: TransferTransactionWhereUniqueInput
    update?: XOR<XOR<TransferTransactionUpdateToOneWithWhereWithoutLogsInput, TransferTransactionUpdateWithoutLogsInput>, TransferTransactionUncheckedUpdateWithoutLogsInput>
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldingsInput
    upsert?: UserUpsertWithoutHoldingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHoldingsInput, UserUpdateWithoutHoldingsInput>, UserUncheckedUpdateWithoutHoldingsInput>
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTradeTypeFieldUpdateOperationsInput = {
    set?: $Enums.TradeType
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutPinnedStocksInput = {
    create?: XOR<UserCreateWithoutPinnedStocksInput, UserUncheckedCreateWithoutPinnedStocksInput>
    connectOrCreate?: UserCreateOrConnectWithoutPinnedStocksInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPinnedStocksNestedInput = {
    create?: XOR<UserCreateWithoutPinnedStocksInput, UserUncheckedCreateWithoutPinnedStocksInput>
    connectOrCreate?: UserCreateOrConnectWithoutPinnedStocksInput
    upsert?: UserUpsertWithoutPinnedStocksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPinnedStocksInput, UserUpdateWithoutPinnedStocksInput>, UserUncheckedUpdateWithoutPinnedStocksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCountryFilter<$PrismaModel = never> = {
    equals?: $Enums.Country | EnumCountryFieldRefInput<$PrismaModel>
    in?: $Enums.Country[]
    notIn?: $Enums.Country[]
    not?: NestedEnumCountryFilter<$PrismaModel> | $Enums.Country
  }

  export type NestedEnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[]
    notIn?: $Enums.Currency[]
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumCountryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Country | EnumCountryFieldRefInput<$PrismaModel>
    in?: $Enums.Country[]
    notIn?: $Enums.Country[]
    not?: NestedEnumCountryWithAggregatesFilter<$PrismaModel> | $Enums.Country
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCountryFilter<$PrismaModel>
    _max?: NestedEnumCountryFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[]
    notIn?: $Enums.Currency[]
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumTradeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeType | EnumTradeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TradeType[]
    notIn?: $Enums.TradeType[]
    not?: NestedEnumTradeTypeFilter<$PrismaModel> | $Enums.TradeType
  }

  export type NestedEnumTradeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeType | EnumTradeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TradeType[]
    notIn?: $Enums.TradeType[]
    not?: NestedEnumTradeTypeWithAggregatesFilter<$PrismaModel> | $Enums.TradeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeTypeFilter<$PrismaModel>
    _max?: NestedEnumTradeTypeFilter<$PrismaModel>
  }

  export type BankAccountCreateWithoutUserInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountUncheckedCreateWithoutUserInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountCreateOrConnectWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput>
  }

  export type BankAccountCreateManyUserInputEnvelope = {
    data: BankAccountCreateManyUserInput | BankAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HoldingCreateWithoutUserInput = {
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
  }

  export type HoldingUncheckedCreateWithoutUserInput = {
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
  }

  export type HoldingCreateOrConnectWithoutUserInput = {
    where: HoldingWhereUniqueInput
    create: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput>
  }

  export type HoldingCreateManyUserInputEnvelope = {
    data: HoldingCreateManyUserInput | HoldingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionStockCreateWithoutUserInput = {
    id?: bigint | number
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
  }

  export type TransactionStockUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
  }

  export type TransactionStockCreateOrConnectWithoutUserInput = {
    where: TransactionStockWhereUniqueInput
    create: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput>
  }

  export type TransactionStockCreateManyUserInputEnvelope = {
    data: TransactionStockCreateManyUserInput | TransactionStockCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PinnedStockCreateWithoutUserInput = {
    id?: bigint | number
    stockId: string
  }

  export type PinnedStockUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    stockId: string
  }

  export type PinnedStockCreateOrConnectWithoutUserInput = {
    where: PinnedStockWhereUniqueInput
    create: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput>
  }

  export type PinnedStockCreateManyUserInputEnvelope = {
    data: PinnedStockCreateManyUserInput | PinnedStockCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BankAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    update: XOR<BankAccountUpdateWithoutUserInput, BankAccountUncheckedUpdateWithoutUserInput>
    create: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput>
  }

  export type BankAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    data: XOR<BankAccountUpdateWithoutUserInput, BankAccountUncheckedUpdateWithoutUserInput>
  }

  export type BankAccountUpdateManyWithWhereWithoutUserInput = {
    where: BankAccountScalarWhereInput
    data: XOR<BankAccountUpdateManyMutationInput, BankAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type BankAccountScalarWhereInput = {
    AND?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
    OR?: BankAccountScalarWhereInput[]
    NOT?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
    id?: StringFilter<"BankAccount"> | string
    userId?: StringFilter<"BankAccount"> | string
    country?: EnumCountryFilter<"BankAccount"> | $Enums.Country
    currency?: EnumCurrencyFilter<"BankAccount"> | $Enums.Currency
    balance?: DecimalFilter<"BankAccount"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
  }

  export type HoldingUpsertWithWhereUniqueWithoutUserInput = {
    where: HoldingWhereUniqueInput
    update: XOR<HoldingUpdateWithoutUserInput, HoldingUncheckedUpdateWithoutUserInput>
    create: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput>
  }

  export type HoldingUpdateWithWhereUniqueWithoutUserInput = {
    where: HoldingWhereUniqueInput
    data: XOR<HoldingUpdateWithoutUserInput, HoldingUncheckedUpdateWithoutUserInput>
  }

  export type HoldingUpdateManyWithWhereWithoutUserInput = {
    where: HoldingScalarWhereInput
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyWithoutUserInput>
  }

  export type HoldingScalarWhereInput = {
    AND?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    OR?: HoldingScalarWhereInput[]
    NOT?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    userId?: StringFilter<"Holding"> | string
    stockId?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
  }

  export type TransactionStockUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionStockWhereUniqueInput
    update: XOR<TransactionStockUpdateWithoutUserInput, TransactionStockUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionStockCreateWithoutUserInput, TransactionStockUncheckedCreateWithoutUserInput>
  }

  export type TransactionStockUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionStockWhereUniqueInput
    data: XOR<TransactionStockUpdateWithoutUserInput, TransactionStockUncheckedUpdateWithoutUserInput>
  }

  export type TransactionStockUpdateManyWithWhereWithoutUserInput = {
    where: TransactionStockScalarWhereInput
    data: XOR<TransactionStockUpdateManyMutationInput, TransactionStockUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionStockScalarWhereInput = {
    AND?: TransactionStockScalarWhereInput | TransactionStockScalarWhereInput[]
    OR?: TransactionStockScalarWhereInput[]
    NOT?: TransactionStockScalarWhereInput | TransactionStockScalarWhereInput[]
    id?: BigIntFilter<"TransactionStock"> | bigint | number
    userId?: StringFilter<"TransactionStock"> | string
    stockId?: StringFilter<"TransactionStock"> | string
    type?: EnumTradeTypeFilter<"TransactionStock"> | $Enums.TradeType
    quantity?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"TransactionStock"> | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFilter<"TransactionStock"> | Date | string
  }

  export type PinnedStockUpsertWithWhereUniqueWithoutUserInput = {
    where: PinnedStockWhereUniqueInput
    update: XOR<PinnedStockUpdateWithoutUserInput, PinnedStockUncheckedUpdateWithoutUserInput>
    create: XOR<PinnedStockCreateWithoutUserInput, PinnedStockUncheckedCreateWithoutUserInput>
  }

  export type PinnedStockUpdateWithWhereUniqueWithoutUserInput = {
    where: PinnedStockWhereUniqueInput
    data: XOR<PinnedStockUpdateWithoutUserInput, PinnedStockUncheckedUpdateWithoutUserInput>
  }

  export type PinnedStockUpdateManyWithWhereWithoutUserInput = {
    where: PinnedStockScalarWhereInput
    data: XOR<PinnedStockUpdateManyMutationInput, PinnedStockUncheckedUpdateManyWithoutUserInput>
  }

  export type PinnedStockScalarWhereInput = {
    AND?: PinnedStockScalarWhereInput | PinnedStockScalarWhereInput[]
    OR?: PinnedStockScalarWhereInput[]
    NOT?: PinnedStockScalarWhereInput | PinnedStockScalarWhereInput[]
    id?: BigIntFilter<"PinnedStock"> | bigint | number
    userId?: StringFilter<"PinnedStock"> | string
    stockId?: StringFilter<"PinnedStock"> | string
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutUserInput
    transactions?: TransactionStockCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionStockUncheckedCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type AccountLogCreateWithoutAccountInput = {
    id?: bigint | number
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    transfer?: TransferTransactionCreateNestedOneWithoutLogsInput
  }

  export type AccountLogUncheckedCreateWithoutAccountInput = {
    id?: bigint | number
    transferId?: bigint | number | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogCreateOrConnectWithoutAccountInput = {
    where: AccountLogWhereUniqueInput
    create: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput>
  }

  export type AccountLogCreateManyAccountInputEnvelope = {
    data: AccountLogCreateManyAccountInput | AccountLogCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type TransferTransactionCreateWithoutFromAccountInput = {
    id?: bigint | number
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    toAccount: BankAccountCreateNestedOneWithoutReceivedTransfersInput
    logs?: AccountLogCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionUncheckedCreateWithoutFromAccountInput = {
    id?: bigint | number
    toAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionCreateOrConnectWithoutFromAccountInput = {
    where: TransferTransactionWhereUniqueInput
    create: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput>
  }

  export type TransferTransactionCreateManyFromAccountInputEnvelope = {
    data: TransferTransactionCreateManyFromAccountInput | TransferTransactionCreateManyFromAccountInput[]
    skipDuplicates?: boolean
  }

  export type TransferTransactionCreateWithoutToAccountInput = {
    id?: bigint | number
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    fromAccount: BankAccountCreateNestedOneWithoutSentTransfersInput
    logs?: AccountLogCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionUncheckedCreateWithoutToAccountInput = {
    id?: bigint | number
    fromAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutTransferInput
  }

  export type TransferTransactionCreateOrConnectWithoutToAccountInput = {
    where: TransferTransactionWhereUniqueInput
    create: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput>
  }

  export type TransferTransactionCreateManyToAccountInputEnvelope = {
    data: TransferTransactionCreateManyToAccountInput | TransferTransactionCreateManyToAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUncheckedUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountLogUpsertWithWhereUniqueWithoutAccountInput = {
    where: AccountLogWhereUniqueInput
    update: XOR<AccountLogUpdateWithoutAccountInput, AccountLogUncheckedUpdateWithoutAccountInput>
    create: XOR<AccountLogCreateWithoutAccountInput, AccountLogUncheckedCreateWithoutAccountInput>
  }

  export type AccountLogUpdateWithWhereUniqueWithoutAccountInput = {
    where: AccountLogWhereUniqueInput
    data: XOR<AccountLogUpdateWithoutAccountInput, AccountLogUncheckedUpdateWithoutAccountInput>
  }

  export type AccountLogUpdateManyWithWhereWithoutAccountInput = {
    where: AccountLogScalarWhereInput
    data: XOR<AccountLogUpdateManyMutationInput, AccountLogUncheckedUpdateManyWithoutAccountInput>
  }

  export type AccountLogScalarWhereInput = {
    AND?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
    OR?: AccountLogScalarWhereInput[]
    NOT?: AccountLogScalarWhereInput | AccountLogScalarWhereInput[]
    id?: BigIntFilter<"AccountLog"> | bigint | number
    accountId?: StringFilter<"AccountLog"> | string
    transferId?: BigIntNullableFilter<"AccountLog"> | bigint | number | null
    type?: EnumTransactionTypeFilter<"AccountLog"> | $Enums.TransactionType
    amount?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"AccountLog"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AccountLog"> | Date | string
  }

  export type TransferTransactionUpsertWithWhereUniqueWithoutFromAccountInput = {
    where: TransferTransactionWhereUniqueInput
    update: XOR<TransferTransactionUpdateWithoutFromAccountInput, TransferTransactionUncheckedUpdateWithoutFromAccountInput>
    create: XOR<TransferTransactionCreateWithoutFromAccountInput, TransferTransactionUncheckedCreateWithoutFromAccountInput>
  }

  export type TransferTransactionUpdateWithWhereUniqueWithoutFromAccountInput = {
    where: TransferTransactionWhereUniqueInput
    data: XOR<TransferTransactionUpdateWithoutFromAccountInput, TransferTransactionUncheckedUpdateWithoutFromAccountInput>
  }

  export type TransferTransactionUpdateManyWithWhereWithoutFromAccountInput = {
    where: TransferTransactionScalarWhereInput
    data: XOR<TransferTransactionUpdateManyMutationInput, TransferTransactionUncheckedUpdateManyWithoutFromAccountInput>
  }

  export type TransferTransactionScalarWhereInput = {
    AND?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
    OR?: TransferTransactionScalarWhereInput[]
    NOT?: TransferTransactionScalarWhereInput | TransferTransactionScalarWhereInput[]
    id?: BigIntFilter<"TransferTransaction"> | bigint | number
    fromAccountId?: StringFilter<"TransferTransaction"> | string
    toAccountId?: StringFilter<"TransferTransaction"> | string
    amount?: DecimalFilter<"TransferTransaction"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"TransferTransaction"> | Date | string
  }

  export type TransferTransactionUpsertWithWhereUniqueWithoutToAccountInput = {
    where: TransferTransactionWhereUniqueInput
    update: XOR<TransferTransactionUpdateWithoutToAccountInput, TransferTransactionUncheckedUpdateWithoutToAccountInput>
    create: XOR<TransferTransactionCreateWithoutToAccountInput, TransferTransactionUncheckedCreateWithoutToAccountInput>
  }

  export type TransferTransactionUpdateWithWhereUniqueWithoutToAccountInput = {
    where: TransferTransactionWhereUniqueInput
    data: XOR<TransferTransactionUpdateWithoutToAccountInput, TransferTransactionUncheckedUpdateWithoutToAccountInput>
  }

  export type TransferTransactionUpdateManyWithWhereWithoutToAccountInput = {
    where: TransferTransactionScalarWhereInput
    data: XOR<TransferTransactionUpdateManyMutationInput, TransferTransactionUncheckedUpdateManyWithoutToAccountInput>
  }

  export type BankAccountCreateWithoutSentTransfersInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    logs?: AccountLogCreateNestedManyWithoutAccountInput
    receivedTransfers?: TransferTransactionCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountUncheckedCreateWithoutSentTransfersInput = {
    id?: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutAccountInput
    receivedTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountCreateOrConnectWithoutSentTransfersInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutSentTransfersInput, BankAccountUncheckedCreateWithoutSentTransfersInput>
  }

  export type BankAccountCreateWithoutReceivedTransfersInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    logs?: AccountLogCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionCreateNestedManyWithoutFromAccountInput
  }

  export type BankAccountUncheckedCreateWithoutReceivedTransfersInput = {
    id?: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    logs?: AccountLogUncheckedCreateNestedManyWithoutAccountInput
    sentTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutFromAccountInput
  }

  export type BankAccountCreateOrConnectWithoutReceivedTransfersInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutReceivedTransfersInput, BankAccountUncheckedCreateWithoutReceivedTransfersInput>
  }

  export type AccountLogCreateWithoutTransferInput = {
    id?: bigint | number
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    account: BankAccountCreateNestedOneWithoutLogsInput
  }

  export type AccountLogUncheckedCreateWithoutTransferInput = {
    id?: bigint | number
    accountId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogCreateOrConnectWithoutTransferInput = {
    where: AccountLogWhereUniqueInput
    create: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput>
  }

  export type AccountLogCreateManyTransferInputEnvelope = {
    data: AccountLogCreateManyTransferInput | AccountLogCreateManyTransferInput[]
    skipDuplicates?: boolean
  }

  export type BankAccountUpsertWithoutSentTransfersInput = {
    update: XOR<BankAccountUpdateWithoutSentTransfersInput, BankAccountUncheckedUpdateWithoutSentTransfersInput>
    create: XOR<BankAccountCreateWithoutSentTransfersInput, BankAccountUncheckedCreateWithoutSentTransfersInput>
    where?: BankAccountWhereInput
  }

  export type BankAccountUpdateToOneWithWhereWithoutSentTransfersInput = {
    where?: BankAccountWhereInput
    data: XOR<BankAccountUpdateWithoutSentTransfersInput, BankAccountUncheckedUpdateWithoutSentTransfersInput>
  }

  export type BankAccountUpdateWithoutSentTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    logs?: AccountLogUpdateManyWithoutAccountNestedInput
    receivedTransfers?: TransferTransactionUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutSentTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutAccountNestedInput
    receivedTransfers?: TransferTransactionUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUpsertWithoutReceivedTransfersInput = {
    update: XOR<BankAccountUpdateWithoutReceivedTransfersInput, BankAccountUncheckedUpdateWithoutReceivedTransfersInput>
    create: XOR<BankAccountCreateWithoutReceivedTransfersInput, BankAccountUncheckedCreateWithoutReceivedTransfersInput>
    where?: BankAccountWhereInput
  }

  export type BankAccountUpdateToOneWithWhereWithoutReceivedTransfersInput = {
    where?: BankAccountWhereInput
    data: XOR<BankAccountUpdateWithoutReceivedTransfersInput, BankAccountUncheckedUpdateWithoutReceivedTransfersInput>
  }

  export type BankAccountUpdateWithoutReceivedTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    logs?: AccountLogUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUpdateManyWithoutFromAccountNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutReceivedTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUncheckedUpdateManyWithoutFromAccountNestedInput
  }

  export type AccountLogUpsertWithWhereUniqueWithoutTransferInput = {
    where: AccountLogWhereUniqueInput
    update: XOR<AccountLogUpdateWithoutTransferInput, AccountLogUncheckedUpdateWithoutTransferInput>
    create: XOR<AccountLogCreateWithoutTransferInput, AccountLogUncheckedCreateWithoutTransferInput>
  }

  export type AccountLogUpdateWithWhereUniqueWithoutTransferInput = {
    where: AccountLogWhereUniqueInput
    data: XOR<AccountLogUpdateWithoutTransferInput, AccountLogUncheckedUpdateWithoutTransferInput>
  }

  export type AccountLogUpdateManyWithWhereWithoutTransferInput = {
    where: AccountLogScalarWhereInput
    data: XOR<AccountLogUpdateManyMutationInput, AccountLogUncheckedUpdateManyWithoutTransferInput>
  }

  export type BankAccountCreateWithoutLogsInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    sentTransfers?: TransferTransactionCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountUncheckedCreateWithoutLogsInput = {
    id?: string
    userId: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    sentTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutFromAccountInput
    receivedTransfers?: TransferTransactionUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type BankAccountCreateOrConnectWithoutLogsInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutLogsInput, BankAccountUncheckedCreateWithoutLogsInput>
  }

  export type TransferTransactionCreateWithoutLogsInput = {
    id?: bigint | number
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    fromAccount: BankAccountCreateNestedOneWithoutSentTransfersInput
    toAccount: BankAccountCreateNestedOneWithoutReceivedTransfersInput
  }

  export type TransferTransactionUncheckedCreateWithoutLogsInput = {
    id?: bigint | number
    fromAccountId: string
    toAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type TransferTransactionCreateOrConnectWithoutLogsInput = {
    where: TransferTransactionWhereUniqueInput
    create: XOR<TransferTransactionCreateWithoutLogsInput, TransferTransactionUncheckedCreateWithoutLogsInput>
  }

  export type BankAccountUpsertWithoutLogsInput = {
    update: XOR<BankAccountUpdateWithoutLogsInput, BankAccountUncheckedUpdateWithoutLogsInput>
    create: XOR<BankAccountCreateWithoutLogsInput, BankAccountUncheckedCreateWithoutLogsInput>
    where?: BankAccountWhereInput
  }

  export type BankAccountUpdateToOneWithWhereWithoutLogsInput = {
    where?: BankAccountWhereInput
    data: XOR<BankAccountUpdateWithoutLogsInput, BankAccountUncheckedUpdateWithoutLogsInput>
  }

  export type BankAccountUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    sentTransfers?: TransferTransactionUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentTransfers?: TransferTransactionUncheckedUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type TransferTransactionUpsertWithoutLogsInput = {
    update: XOR<TransferTransactionUpdateWithoutLogsInput, TransferTransactionUncheckedUpdateWithoutLogsInput>
    create: XOR<TransferTransactionCreateWithoutLogsInput, TransferTransactionUncheckedCreateWithoutLogsInput>
    where?: TransferTransactionWhereInput
  }

  export type TransferTransactionUpdateToOneWithWhereWithoutLogsInput = {
    where?: TransferTransactionWhereInput
    data: XOR<TransferTransactionUpdateWithoutLogsInput, TransferTransactionUncheckedUpdateWithoutLogsInput>
  }

  export type TransferTransactionUpdateWithoutLogsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromAccount?: BankAccountUpdateOneRequiredWithoutSentTransfersNestedInput
    toAccount?: BankAccountUpdateOneRequiredWithoutReceivedTransfersNestedInput
  }

  export type TransferTransactionUncheckedUpdateWithoutLogsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAccountId?: StringFieldUpdateOperationsInput | string
    toAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutHoldingsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountCreateNestedManyWithoutUserInput
    transactions?: TransactionStockCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHoldingsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionStockUncheckedCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHoldingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
  }

  export type UserUpsertWithoutHoldingsInput = {
    update: XOR<UserUpdateWithoutHoldingsInput, UserUncheckedUpdateWithoutHoldingsInput>
    create: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHoldingsInput, UserUncheckedUpdateWithoutHoldingsInput>
  }

  export type UserUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUncheckedUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTransactionsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    pinnedStocks?: PinnedStockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    pinnedStocks?: PinnedStockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPinnedStocksInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    transactions?: TransactionStockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPinnedStocksInput = {
    id: string
    firstName: string
    lastName: string
    birthDate: Date | string
    idCard: string
    createdAt?: Date | string
    accounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionStockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPinnedStocksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPinnedStocksInput, UserUncheckedCreateWithoutPinnedStocksInput>
  }

  export type UserUpsertWithoutPinnedStocksInput = {
    update: XOR<UserUpdateWithoutPinnedStocksInput, UserUncheckedUpdateWithoutPinnedStocksInput>
    create: XOR<UserCreateWithoutPinnedStocksInput, UserUncheckedCreateWithoutPinnedStocksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPinnedStocksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPinnedStocksInput, UserUncheckedUpdateWithoutPinnedStocksInput>
  }

  export type UserUpdateWithoutPinnedStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPinnedStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    idCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionStockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BankAccountCreateManyUserInput = {
    id?: string
    country: $Enums.Country
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type HoldingCreateManyUserInput = {
    stockId: string
    quantity: Decimal | DecimalJsLike | number | string
    avgCost: Decimal | DecimalJsLike | number | string
  }

  export type TransactionStockCreateManyUserInput = {
    id?: bigint | number
    stockId: string
    type: $Enums.TradeType
    quantity: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    tradeDate?: Date | string
  }

  export type PinnedStockCreateManyUserInput = {
    id?: bigint | number
    stockId: string
  }

  export type BankAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutAccountNestedInput
    sentTransfers?: TransferTransactionUncheckedUpdateManyWithoutFromAccountNestedInput
    receivedTransfers?: TransferTransactionUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type BankAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: EnumCountryFieldUpdateOperationsInput | $Enums.Country
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUpdateWithoutUserInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type HoldingUncheckedUpdateWithoutUserInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type HoldingUncheckedUpdateManyWithoutUserInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    avgCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TransactionStockUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionStockUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionStockUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
    type?: EnumTradeTypeFieldUpdateOperationsInput | $Enums.TradeType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PinnedStockUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type PinnedStockUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type PinnedStockUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    stockId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountLogCreateManyAccountInput = {
    id?: bigint | number
    transferId?: bigint | number | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type TransferTransactionCreateManyFromAccountInput = {
    id?: bigint | number
    toAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type TransferTransactionCreateManyToAccountInput = {
    id?: bigint | number
    fromAccountId: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogUpdateWithoutAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfer?: TransferTransactionUpdateOneWithoutLogsNestedInput
  }

  export type AccountLogUncheckedUpdateWithoutAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transferId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogUncheckedUpdateManyWithoutAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transferId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferTransactionUpdateWithoutFromAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toAccount?: BankAccountUpdateOneRequiredWithoutReceivedTransfersNestedInput
    logs?: AccountLogUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionUncheckedUpdateWithoutFromAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    toAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionUncheckedUpdateManyWithoutFromAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    toAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferTransactionUpdateWithoutToAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromAccount?: BankAccountUpdateOneRequiredWithoutSentTransfersNestedInput
    logs?: AccountLogUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionUncheckedUpdateWithoutToAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: AccountLogUncheckedUpdateManyWithoutTransferNestedInput
  }

  export type TransferTransactionUncheckedUpdateManyWithoutToAccountInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAccountId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogCreateManyTransferInput = {
    id?: bigint | number
    accountId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AccountLogUpdateWithoutTransferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: BankAccountUpdateOneRequiredWithoutLogsNestedInput
  }

  export type AccountLogUncheckedUpdateWithoutTransferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountLogUncheckedUpdateManyWithoutTransferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankAccountCountOutputTypeDefaultArgs instead
     */
    export type BankAccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankAccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransferTransactionCountOutputTypeDefaultArgs instead
     */
    export type TransferTransactionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransferTransactionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankAccountDefaultArgs instead
     */
    export type BankAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransferTransactionDefaultArgs instead
     */
    export type TransferTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransferTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountLogDefaultArgs instead
     */
    export type AccountLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoldingDefaultArgs instead
     */
    export type HoldingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoldingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionStockDefaultArgs instead
     */
    export type TransactionStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionStockDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PinnedStockDefaultArgs instead
     */
    export type PinnedStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PinnedStockDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}