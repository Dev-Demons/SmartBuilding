<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [decentraland-ecs](./decentraland-ecs.md) &gt; [Quaternion](./decentraland-ecs.quaternion.md) &gt; [SlerpToRef](./decentraland-ecs.quaternion.slerptoref.md)

## Quaternion.SlerpToRef() method

Interpolates between two quaternions and stores it into a target quaternion

<b>Signature:</b>

```typescript
static SlerpToRef(left: ReadOnlyQuaternion, right: ReadOnlyQuaternion, amount: number, result: Quaternion): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  left | <code>ReadOnlyQuaternion</code> | defines first quaternion |
|  right | <code>ReadOnlyQuaternion</code> | defines second quaternion |
|  amount | <code>number</code> | defines the gradient to use |
|  result | <code>Quaternion</code> | defines the target quaternion |

<b>Returns:</b>

`void`

