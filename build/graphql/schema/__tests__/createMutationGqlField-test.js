"use strict";
jest.mock('../getQueryGqlType');
var graphql_1 = require("graphql");
var getQueryGqlType_1 = require("../getQueryGqlType");
var createMutationGqlField_1 = require("../createMutationGqlField");
// Create a new object where `GraphQLString` is the prototype. This means it
// will have the exact same behavior as `GraphQLString`, however
// `queryType !== GraphQLString` which is nice for tests.
var queryType = Object.create(graphql_1.GraphQLString);
getQueryGqlType_1.default.mockReturnValue(queryType);
test('will only create a single input argument', function () {
    var field = createMutationGqlField_1.default({}, { name: 'foo' });
    expect(Object.keys(field.args)).toEqual(['input']);
});
test('will create a non-null input type for the input argument with the correct name', function () {
    var field = createMutationGqlField_1.default({}, { name: 'foo' });
    expect(field.args.input.type instanceof graphql_1.GraphQLNonNull).toBe(true);
    expect(field.args.input.type.ofType instanceof graphql_1.GraphQLInputObjectType).toBe(true);
    expect(field.args.input.type.ofType.name).toBe('FooInput');
});
test('will always add a `clientMutationId` field to input objects', function () {
    var field = createMutationGqlField_1.default({}, { name: 'foo' });
    expect(Object.keys(field.args.input.type.ofType.getFields())).toEqual(['clientMutationId']);
    expect(field.args.input.type.ofType.getFields().clientMutationId.type).toEqual(graphql_1.GraphQLString);
});
test('will add extra input fields from the config and skip falsies', function () {
    var inputFields = [
        ['a', { name: 'a', type: graphql_1.GraphQLString }],
        null,
        ['b', { name: 'b', type: graphql_1.GraphQLString }],
        ['c', { name: 'c', type: graphql_1.GraphQLString }],
    ];
    var field = createMutationGqlField_1.default({}, { name: 'foo', inputFields: inputFields });
    expect(Object.keys(field.args.input.type.ofType.getFields())).toEqual(['clientMutationId', 'a', 'b', 'c']);
    expect(field.args.input.type.ofType.getFields().a).toEqual(inputFields[0][1]);
    expect(field.args.input.type.ofType.getFields().b).toEqual(inputFields[2][1]);
    expect(field.args.input.type.ofType.getFields().c).toEqual(inputFields[3][1]);
});
test('will return an object payload type', function () {
    var field = createMutationGqlField_1.default({}, { name: 'foo' });
    expect(field.type instanceof graphql_1.GraphQLObjectType).toBe(true);
    expect(field.type.name).toBe('FooPayload');
});
test('will always include `clientMutationId` and `query` fields', function () {
    getQueryGqlType_1.default.mockClear();
    var buildToken = Symbol('buildToken');
    var clientMutationId = Symbol('clientMutationId');
    var field = createMutationGqlField_1.default(buildToken, { name: 'foo' });
    expect(Object.keys(field.type.getFields())).toEqual(['clientMutationId', 'query']);
    expect(field.type.getFields().clientMutationId.type).toBe(graphql_1.GraphQLString);
    expect(field.type.getFields().clientMutationId.resolve({ clientMutationId: clientMutationId })).toBe(clientMutationId);
    expect(field.type.getFields().query.type).toBe(queryType);
    expect(field.type.getFields().query.resolve()).toBe(getQueryGqlType_1.$$isQuery);
    expect(getQueryGqlType_1.default.mock.calls).toEqual([[buildToken]]);
});
test('will add `outputFields` in payload type and skip falsies', function () {
    var resolve = Symbol('resolve');
    var description = Symbol('description');
    var deprecationReason = Symbol('deprecationReason');
    var outputFields = [
        ['a', { type: graphql_1.GraphQLString }],
        null,
        ['b', { type: graphql_1.GraphQLString }],
        ['c', { type: graphql_1.GraphQLString, args: { arg: { type: graphql_1.GraphQLString } }, resolve: resolve, description: description, deprecationReason: deprecationReason }],
    ];
    var field = createMutationGqlField_1.default({}, { name: 'foo', outputFields: outputFields });
    expect(Object.keys(field.type.getFields())).toEqual(['clientMutationId', 'a', 'b', 'c', 'query']);
    expect(field.type.getFields().a).toEqual({ name: 'a', type: graphql_1.GraphQLString, args: [], resolve: null, isDeprecated: false });
    expect(field.type.getFields().b).toEqual({ name: 'b', type: graphql_1.GraphQLString, args: [], resolve: null, isDeprecated: false });
    expect(field.type.getFields().c).toEqual({ name: 'c', type: graphql_1.GraphQLString, args: [{ name: 'arg', type: graphql_1.GraphQLString, defaultValue: undefined, description: null }], resolve: field.type.getFields().c.resolve, description: description, deprecationReason: deprecationReason, isDeprecated: true });
});
test('will proxy the resolved value to the resolver in `outputFields`', function () {
    var value = Symbol('value');
    var resolvedValue = Symbol('resolvedValue');
    var restArgs = [Symbol(), Symbol(), Symbol()];
    var resolve = jest.fn(function () { return resolvedValue; });
    var field = createMutationGqlField_1.default({}, { name: 'foo', outputFields: [['a', { type: graphql_1.GraphQLString, resolve: resolve }]] });
    expect((_a = field.type.getFields().a).resolve.apply(_a, [{ value: value }].concat(restArgs))).toBe(resolvedValue);
    expect(resolve.mock.calls).toEqual([[value].concat(restArgs)]);
    var _a;
});
// test('resolve will call the execute function with the correct arguments', async () => {
//   const context = new Context()
//   const clientMutationId = Symbol('clientMutationId')
//   const input = { clientMutationId, a: 1, b: 2, c: 3 }
//   const value = Symbol('value')
//   const execute = jest.fn(() => value)
//   const field = createMutationGqlField({}, { name: 'foo', execute })
//   expect(await field.resolve({}, { input }, context)).toEqual({ clientMutationId, value })
//   expect(execute.mock.calls).toEqual([[context, input]])
// })
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlTXV0YXRpb25HcWxGaWVsZC10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dyYXBocWwvc2NoZW1hL19fdGVzdHNfXy9jcmVhdGVNdXRhdGlvbkdxbEZpZWxkLXRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtBQUUvQixtQ0FBa0c7QUFDbEcsc0RBQStEO0FBQy9ELG9FQUE4RDtBQUU5RCw0RUFBNEU7QUFDNUUsZ0VBQWdFO0FBQ2hFLHlEQUF5RDtBQUN6RCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUFhLENBQUMsQ0FBQTtBQUU5Qyx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUUxQyxJQUFJLENBQUMsMENBQTBDLEVBQUU7SUFDL0MsSUFBTSxLQUFLLEdBQUcsZ0NBQXNCLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxnRkFBZ0YsRUFBRTtJQUNyRixJQUFNLEtBQUssR0FBRyxnQ0FBc0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLHdCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLFlBQVksZ0NBQXNC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